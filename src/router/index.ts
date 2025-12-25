import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/modules/admin/layout/AdminLayout.vue";
import AdminDashboard from "@/modules/admin/views/AdminDashboard.vue";
import AdminUsers from "@/modules/admin/views/AdminUsers.vue";
import AdminProducts from "@/modules/admin/views/AdminProducts.vue";
import AdminSuppliers from "@/modules/admin/views/AdminSuppliers.vue";
import ProductsDetail from "@/modules/admin/views/DetailsPages/ProductsDetail.vue";
import UsersDetail from "@/modules/admin/views/DetailsPages/UsersDetail.vue";
import SupplierDetail from "@/modules/admin/views/DetailsPages/SupplierDetail.vue";
import AdminCashRegister from "@/modules/admin/views/AdminCashRegister.vue";
import CashRegisterDetail from "@/modules/admin/views/DetailsPages/CashRegisterDetail.vue";
import NotFound from "@/components/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // LOGIN (rota inicial)
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("@/modules/auth/views/LoginView.vue"),
        },

        // PDV (frente de caixa)
        {
            path: "/pdv",
            name: "PDV",
            component: () => import("@/modules/pdv/views/PDVView.vue"),
        },
        {
            path: "/admin",
            redirect: "/admin/dashboard",
            component: AdminLayout,
            children: [
                { path: "dashboard", component: AdminDashboard, name: "AdminDashboard" },
                { path: "users", component: AdminUsers, name: "AdminUsers" },
                { path: "users/new", component: UsersDetail, name: "AdminUsersNew", props: true },
                { path: "users/:id/edit", component: UsersDetail, name: "AdminUsersEdit", props: true },
                { path: "suppliers", component: AdminSuppliers, name: "AdminSuppliers" },
                { path: "suppliers/new", component: SupplierDetail, name: "AdminSuppliersNew", props: true },
                { path: "suppliers/:id/edit", component: SupplierDetail, name: "AdminSuppliersEdit", props: true },
                { path: "cash-register", component: AdminCashRegister, name: "AdminCashRegister" },
                { path: "cash-register/:id/edit", component: CashRegisterDetail, name: "AdminCashRegisterEdit", props: true },
                { path: "products", component: AdminProducts, name: "AdminProducts" },
                { path: "products/new", component: ProductsDetail, name: "AdminProductNew" },
                { path: "products/:id/edit", component: ProductsDetail, name: "AdminProductEdit", props: true },
            ],
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: NotFound,
        },
    ],
});

export default router;
