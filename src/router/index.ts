import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/modules/admin/layout/AdminLayout.vue";
import AdminDashboard from "@/modules/admin/views/AdminDashboard.vue";
import AdminUsers from "@/modules/admin/views/AdminUsers.vue";
import AdminProducts from "@/modules/admin/views/AdminProducts.vue";
import AdminSuppliers from "@/modules/admin/views/AdminSuppliers.vue";

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
                { path: "products", component: AdminProducts, name: "AdminProducts" },
                { path: "suppliers", component: AdminSuppliers, name: "AdminSuppliers" },
            ],
        },
    ],
});

export default router;
