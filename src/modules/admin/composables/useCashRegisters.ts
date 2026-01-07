// src/modules/admin/composables/useCashRegisters.ts
import { onMounted, ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import router from "@/router";

import { useHelpers } from "../../../composables/useHelpers";

import type { CashRegisterResponse } from "@/api/generated";
import { fetchCashRegisters } from "@/modules/admin/services/cashRegisterService";

export function useCashRegisters() {
    const { formatCurrency, formatDate, getCashRegisterStatusBadge } = useHelpers();

    const cashRegister = ref<CashRegisterResponse[]>([]);
    const loading = ref(false);

    // Colunas
    const columns: ColumnDef<CashRegisterResponse>[] = [
        { accessorKey: "code", header: "Código", size: 60 },
        { accessorKey: "name", header: "Nome", size: 120 },
        { accessorKey: "location", header: "Setor", size: 120 },
        {
            id: "actions",
            header: "Ações",
            enableSorting: false,
            size: 180,
        },
    ];

    const loadCashRegister = async () => {
        loading.value = true;
        try {
            cashRegister.value = await fetchCashRegisters();
        } finally {
            loading.value = false;
        }
    };

    const handleNewCashRegister = () => {
        router.push({ name: "AdminCashRegisterNew" });
    };

    const handleViewDetails = (id: string) => {
        router.push({ name: "AdminCashRegisterEdit", params: { id } });
    };

    // const handleOpenCashRegister = (id: number) => {
    //     const cashRegister = cashRegisters.value.find((cr) => cr.id === id);
    //     if (cashRegister) {
    //         cashRegister.status = "open";
    //         cashRegister.lastOpening = new Date();
    //         cashRegister.user = "Usuário Atual";
    //         toast.add({
    //             severity: "success",
    //             summary: "Sucesso",
    //             detail: "Caixa aberto com sucesso!",
    //             life: 3000,
    //         });
    //     }
    // };

    // const handleCloseCashRegister = (id: number) => {
    //     const cashRegister = cashRegisters.value.find((cr) => cr.id === id);
    //     if (cashRegister) {
    //         cashRegister.status = "closed";
    //         cashRegister.lastClosure = new Date();
    //         toast.add({
    //             severity: "error",
    //             summary: "Sucesso",
    //             detail: "Caixa fechado com sucesso!",
    //             life: 3000,
    //         });
    //     }
    // };

    onMounted(loadCashRegister);

    return {
        cashRegister,
        columns,
        formatCurrency,
        formatDate,
        getStatusBadge: getCashRegisterStatusBadge,
        handleNewCashRegister,
        handleViewDetails,
    };
}
