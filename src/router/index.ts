import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/modules/admin/layout/AdminLayout.vue";
import AdminDashboard from "@/modules/admin/views/AdminDashboard.vue";
import AdminUsers from "@/modules/admin/views/AdminUsers.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../modules/pdv/views/PDVView.vue"),
        },
        {
            path: "/admin",
            component: AdminLayout,
            children: [
                { path: "dashboard", component: AdminDashboard, name: "AdminDashboard" },
                { path: "users", component: AdminUsers, name: "AdminUsers" },
            ],
        },
    ],
});

export default router;
