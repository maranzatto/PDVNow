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
import AdminConfig from "@/modules/admin/views/AdminConfig.vue";
import { useAuthStore } from "@/modules/auth/store/auth";
import AdminCustomers from "@/modules/admin/views/AdminCustomers.vue";
import CustomersDetail from "@/modules/admin/views/DetailsPages/CustomersDetail.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // LOGIN
        {
            path: "/login",
            name: "Login",
            component: () => import("@/modules/auth/views/LoginView.vue"),
            meta: { requiresAuth: false },
        },

        // ROOT - Será tratado pelo navigation guard
        {
            path: "/",
            name: "Root",
            redirect: "/admin/dashboard", // Fallback padrão
            meta: { requiresAuth: true },
        },

        // PDV (frente de caixa)
        {
            path: "/pdv",
            name: "PDV",
            component: () => import("@/modules/pdv/views/PDVView.vue"),
            meta: { requiresAuth: true },
        },

        // ADMIN
        {
            path: "/admin",
            redirect: "/admin/dashboard",
            component: AdminLayout,
            meta: { requiresAuth: true },
            children: [
                { path: "dashboard", component: AdminDashboard, name: "AdminDashboard" },
                { path: "users", component: AdminUsers, name: "AdminUsers" },
                { path: "users/new", component: UsersDetail, name: "AdminUsersNew", props: true },
                { path: "users/:id/edit", component: UsersDetail, name: "AdminUsersEdit", props: true },
                { path: "costumers", component: AdminCustomers, name: "AdminCostumers" },
                { path: "costumers/new", component: CustomersDetail, name: "AdminCostumersNew", props: true },
                { path: "costumers/:id/edit", component: CustomersDetail, name: "AdminCostumersEdit", props: true },
                { path: "suppliers", component: AdminSuppliers, name: "AdminSuppliers" },
                { path: "suppliers/new", component: SupplierDetail, name: "AdminSuppliersNew", props: true },
                { path: "suppliers/:id/edit", component: SupplierDetail, name: "AdminSuppliersEdit", props: true },
                { path: "cash-register", component: AdminCashRegister, name: "AdminCashRegister" },
                { path: "cash-register/new", component: CashRegisterDetail, name: "AdminCashRegisterNew" },
                { path: "cash-register/:id/edit", component: CashRegisterDetail, name: "AdminCashRegisterEdit", props: true },
                { path: "products", component: AdminProducts, name: "AdminProducts" },
                { path: "products/new", component: ProductsDetail, name: "AdminProductNew" },
                { path: "products/:id/edit", component: ProductsDetail, name: "AdminProductEdit", props: true },
                { path: "theme-config", component: AdminConfig, name: "AdminConfig" },
            ],
        },

        // NOT FOUND
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: NotFound,
        },
    ],
});

// Navigation Guard com suporte a autenticação assíncrona
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Aguarda inicialização se ainda estiver carregando
    if (authStore.isLoading) {
        await authStore.initialize();
    }

    const requiresAuth = to.meta.requiresAuth !== false;

    // Se a rota requer autenticação e o usuário não está autenticado
    if (requiresAuth && !authStore.isAuthenticated) {
        // Se já está tentando ir para login, permite
        if (to.name === "Login") {
            next();
        } else {
            // Caso contrário, redireciona para login com query de redirecionamento
            next({
                name: "Login",
                query: { redirect: to.fullPath },
            });
        }
        return;
    }

    // Se o usuário está autenticado e tenta acessar a página de login
    if (to.name === "Login" && authStore.isAuthenticated) {
        // Redireciona para a página que estava tentando acessar ou dashboard
        const redirect = (to.query.redirect as string) || "/admin/dashboard";
        next(redirect);
        return;
    }

    // Permite a navegação
    next();
});

export default router;
