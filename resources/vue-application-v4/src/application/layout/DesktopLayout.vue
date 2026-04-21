<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import menuSuperAdmin from '../config/menuSuperAdmin';
import cs from 'cupparis-primevue';

const route = useRoute();
const router = useRouter();
const menuNodes = ref([]);
const navigationStack = ref([]);
const openTabs = ref([]);
const desktopSearch = ref('');
const TABS_STORAGE_KEY = 'desktop-layout-open-tabs';

onMounted(() => {
    const baseMenu = [];
    if (import.meta.env.VITE_MODE === 'dev') {
        baseMenu.push(menuSuperAdmin);
    }
    baseMenu.push(...(cs.CrudVars.env.appMenu || []));
    menuNodes.value = normalizeNodes(baseMenu, 1);
    loadTabsFromStorage();
    openPathByRoute(route.path);
    addCurrentRouteToTabs();
});

const currentPath = computed(() => route.path);
const isDesktopHome = computed(() => route.path === '/' || route.name === 'dashboard');
const currentNodes = computed(() => {
    if (navigationStack.value.length === 0) {
        return menuNodes.value;
    }
    return navigationStack.value[navigationStack.value.length - 1].children || [];
});
const hasSearch = computed(() => desktopSearch.value.trim().length > 0);
const filteredLeaves = computed(() => {
    if (!hasSearch.value) {
        return [];
    }
    const query = desktopSearch.value.trim().toLowerCase();
    const leaves = [];
    collectLeaves(menuNodes.value, [], leaves);
    return leaves.filter((leaf) => leaf.searchText.includes(query));
});

function normalizeNodes(items, level, parentId = 'root') {
    if (!Array.isArray(items) || level > 3) {
        return [];
    }

    return items.map((item, index) => {
        const nodeId = `${parentId}-${level}-${index}`;
        const children = normalizeNodes(item.items || [], level + 1, nodeId);

        return {
            id: nodeId,
            level,
            label: item.label || 'Senza titolo',
            icon: item.icon || 'fa fa-folder',
            to: item.to || null,
            href: item.href || null,
            target: item.target || '_self',
            children,
            isLeaf: children.length === 0 && (!!item.to || !!item.href)
        };
    });
}

function openFolder(node) {
    if (!node || node.children.length === 0) {
        return;
    }
    navigationStack.value.push(node);
}

function goToRoot() {
    navigationStack.value = [];
}

function goBackFolder() {
    if (navigationStack.value.length > 0) {
        navigationStack.value.pop();
    }
}

function goToFolderByIndex(index) {
    navigationStack.value = navigationStack.value.slice(0, index + 1);
}

function goToDesktop() {
    router.push('/');
}

function addCurrentRouteToTabs() {
    if (isDesktopHome.value) {
        return;
    }

    const existing = openTabs.value.find((tab) => tab.path === route.path);
    if (existing) {
        existing.label = resolveRouteLabel(route.path);
        return;
    }

    openTabs.value.push({
        path: route.path,
        label: resolveRouteLabel(route.path)
    });
    persistTabs();
}

function resolveRouteLabel(path) {
    const found = findNodeByPath(menuNodes.value, path);
    return found ? found.label : path;
}

function findNodeByPath(nodes, path) {
    for (const node of nodes) {
        if (node.to === path) {
            return node;
        }
        if (node.children.length > 0) {
            const found = findNodeByPath(node.children, path);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

function switchToTab(tabPath) {
    router.push(tabPath);
}

function closeTab(tabPath) {
    const index = openTabs.value.findIndex((tab) => tab.path === tabPath);
    if (index === -1) {
        return;
    }

    const isCurrent = route.path === tabPath;
    openTabs.value.splice(index, 1);
    persistTabs();

    if (!isCurrent) {
        return;
    }

    if (openTabs.value.length === 0) {
        goToDesktop();
        return;
    }

    const fallback = openTabs.value[index] || openTabs.value[index - 1] || openTabs.value[0];
    router.push(fallback.path);
}

function closeAllTabs() {
    openTabs.value = [];
    persistTabs();
    if (!isDesktopHome.value) {
        goToDesktop();
    }
}

function collectLeaves(nodes, parentLabels, out) {
    for (const node of nodes) {
        const nextPath = [...parentLabels, node.label];
        if (node.children.length > 0) {
            collectLeaves(node.children, nextPath, out);
            continue;
        }
        if (!node.to && !node.href) {
            continue;
        }
        out.push({
            id: `leaf-${node.id}`,
            label: node.label,
            to: node.to,
            href: node.href,
            target: node.target,
            pathLabel: parentLabels.join(' / '),
            searchText: nextPath.join(' ').toLowerCase()
        });
    }
}

function persistTabs() {
    sessionStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(openTabs.value));
}

function loadTabsFromStorage() {
    const raw = sessionStorage.getItem(TABS_STORAGE_KEY);
    if (!raw) {
        return;
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return;
        }
        openTabs.value = parsed
            .filter((tab) => tab && typeof tab.path === 'string' && tab.path !== '/')
            .map((tab) => ({
                path: tab.path,
                label: typeof tab.label === 'string' && tab.label ? tab.label : tab.path
            }));
    } catch (error) {
        openTabs.value = [];
    }
}

function openPathByRoute(path) {
    if (!path) {
        return;
    }
    const branch = [];
    const found = findBranch(menuNodes.value, path, branch);
    if (found && branch.length > 0) {
        navigationStack.value = branch;
    }
}

function findBranch(nodes, path, branch) {
    for (const node of nodes) {
        if (node.to === path) {
            return true;
        }

        if (node.children.length > 0) {
            branch.push(node);
            const found = findBranch(node.children, path, branch);
            if (found) {
                return true;
            }
            branch.pop();
        }
    }
    return false;
}

watch(
    () => route.fullPath,
    (newPath) => {
        openPathByRoute(route.path);
        addCurrentRouteToTabs();
    }
);

watch(
    openTabs,
    () => {
        persistTabs();
    },
    { deep: true }
);
</script>

<template>
    <div class="desktop-layout min-h-screen bg-surface-50 dark:bg-surface-950">
        <div class="px-6 pt-4 content-toolbar">
            <button type="button" class="back-desktop-btn" @click="goToDesktop" :disabled="isDesktopHome">
                <i class="fa fa-desktop mr-2" />
                Torna al desktop
            </button>
            <div class="tabs-wrap">
                <button
                    v-if="openTabs.length > 0"
                    type="button"
                    class="close-all-tabs-btn"
                    @click="closeAllTabs"
                >
                    Chiudi tutte
                </button>
                <button
                    v-for="tab in openTabs"
                    :key="tab.path"
                    type="button"
                    class="content-tab"
                    :class="{ 'content-tab-active': tab.path === currentPath }"
                    @click="switchToTab(tab.path)"
                >
                    <span class="tab-label">{{ tab.label }}</span>
                    <span class="tab-close" @click.stop="closeTab(tab.path)">
                        <i class="fa fa-times" />
                    </span>
                </button>
            </div>
        </div>

        <template v-if="isDesktopHome">
            <div class="p-6 pb-3">
                <div class="desktop-window">
                    <div class="desktop-toolbar">
                        <div class="flex items-center gap-2">
                            <button type="button" class="toolbar-btn" @click="goBackFolder" :disabled="navigationStack.length === 0">
                                <i class="fa fa-arrow-left" />
                            </button>
                            <button type="button" class="toolbar-btn" @click="goToRoot">
                                <i class="fa fa-desktop" />
                            </button>
                        </div>
                        <div class="flex items-center gap-2 text-sm overflow-x-auto">
                            <button type="button" class="crumb-btn" @click="goToRoot">Desktop</button>
                            <template v-for="(folder, index) in navigationStack" :key="folder.id">
                                <span>/</span>
                                <button type="button" class="crumb-btn" @click="goToFolderByIndex(index)">{{ folder.label }}</button>
                            </template>
                        </div>
                    </div>
                    <div class="desktop-search-wrap">
                        <input
                            v-model="desktopSearch"
                            type="text"
                            class="desktop-search-input"
                            placeholder="Cerca voce menu..."
                        />
                    </div>

                    <div class="desktop-grid">
                        <template v-if="hasSearch">
                            <template v-for="leaf in filteredLeaves" :key="leaf.id">
                                <router-link
                                    v-if="leaf.to"
                                    :to="leaf.to"
                                    class="desktop-item"
                                    :class="{ 'desktop-item-active': currentPath === leaf.to }"
                                >
                                    <i class="fa fa-file-text-o desktop-icon file-icon" />
                                    <span class="desktop-label">{{ leaf.label }}</span>
                                    <span class="desktop-sub-label">{{ leaf.pathLabel }}</span>
                                </router-link>
                                <a v-else :href="leaf.href" :target="leaf.target" class="desktop-item">
                                    <i class="fa fa-link desktop-icon file-icon" />
                                    <span class="desktop-label">{{ leaf.label }}</span>
                                    <span class="desktop-sub-label">{{ leaf.pathLabel }}</span>
                                </a>
                            </template>
                        </template>

                        <template v-else v-for="node in currentNodes" :key="node.id">
                            <button v-if="node.children.length > 0" type="button" class="desktop-item" @click="openFolder(node)">
                                <i class="fa fa-folder desktop-icon folder-icon" />
                                <span class="desktop-label">{{ node.label }}</span>
                            </button>

                            <router-link
                                v-else-if="node.to"
                                :to="node.to"
                                class="desktop-item"
                                :class="{ 'desktop-item-active': currentPath === node.to }"
                            >
                                <i class="fa fa-file-text-o desktop-icon file-icon" />
                                <span class="desktop-label">{{ node.label }}</span>
                            </router-link>

                            <a v-else-if="node.href" :href="node.href" :target="node.target" class="desktop-item">
                                <i class="fa fa-link desktop-icon file-icon" />
                                <span class="desktop-label">{{ node.label }}</span>
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <main class="px-6 py-4">
                <router-view :key="$route.fullPath" />
            </main>
        </template>
    </div>
</template>

<style scoped>
.desktop-window {
    border: 1px solid var(--p-surface-300);
    border-radius: 0.75rem;
    background: var(--p-surface-0);
    min-height: 360px;
}

.dark .desktop-window {
    border-color: var(--p-surface-700);
    background: var(--p-surface-900);
}

.desktop-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--p-surface-300);
}

.dark .desktop-toolbar {
    border-color: var(--p-surface-700);
}

.toolbar-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    border: 1px solid var(--p-surface-300);
}

.dark .toolbar-btn {
    border-color: var(--p-surface-700);
}

.toolbar-btn:disabled {
    opacity: 0.45;
}

.crumb-btn {
    text-decoration: underline;
}

.desktop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.desktop-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0.45rem;
    border-radius: 0.75rem;
    padding: 0.75rem;
    text-decoration: none;
    color: var(--p-surface-800);
    min-height: 108px;
}

.dark .desktop-item {
    color: var(--p-surface-100);
}

.desktop-item:hover {
    background: color-mix(in srgb, var(--p-primary-500) 12%, transparent);
}

.desktop-item-active {
    background: color-mix(in srgb, var(--p-primary-500) 18%, transparent);
    font-weight: 600;
}

.desktop-icon {
    font-size: 2rem;
}

.folder-icon {
    color: #eab308;
}

.file-icon {
    color: var(--p-primary-500);
}

.desktop-label {
    text-align: center;
    line-height: 1.2;
    word-break: break-word;
}

.desktop-sub-label {
    text-align: center;
    font-size: 0.72rem;
    opacity: 0.75;
    line-height: 1.1;
}

.desktop-search-wrap {
    padding: 0.75rem 1rem 0;
}

.desktop-search-input {
    width: 100%;
    border: 1px solid var(--p-surface-300);
    border-radius: 0.5rem;
    padding: 0.5rem 0.7rem;
}

.dark .desktop-search-input {
    border-color: var(--p-surface-700);
    background: var(--p-surface-900);
    color: var(--p-surface-100);
}

.back-desktop-btn {
    border: 1px solid var(--p-surface-300);
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    white-space: nowrap;
}

.back-desktop-btn:disabled {
    opacity: 0.45;
}

.dark .back-desktop-btn {
    border-color: var(--p-surface-700);
}

.content-toolbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.tabs-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    overflow-x: auto;
    width: 100%;
}

.content-tab {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--p-surface-300);
    border-radius: 0.5rem;
    padding: 0.4rem 0.6rem;
    max-width: 260px;
}

.dark .content-tab {
    border-color: var(--p-surface-700);
}

.content-tab-active {
    background: color-mix(in srgb, var(--p-primary-500) 16%, transparent);
}

.tab-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tab-close {
    opacity: 0.7;
    border-radius: 9999px;
    width: 1.1rem;
    height: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.tab-close:hover {
    opacity: 1;
    background: color-mix(in srgb, var(--p-primary-500) 18%, transparent);
}

.close-all-tabs-btn {
    border: 1px solid var(--p-surface-300);
    border-radius: 0.5rem;
    padding: 0.4rem 0.65rem;
    white-space: nowrap;
}

.dark .close-all-tabs-btn {
    border-color: var(--p-surface-700);
}
</style>
