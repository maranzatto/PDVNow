// src/modules/admin/composables/useCashRegisters.ts
import { ref } from "vue";
import { type ColumnDef } from "@tanstack/vue-table";
import type { CashRegister } from "../types/CashRegister";
import router from "@/router";
import { useToast } from "primevue/usetoast";
import { useHelpers } from "../../../composables/useHelpers";

export function useCashRegisters() {
    const { formatCurrency, formatDate, getCashRegisterStatusBadge } = useHelpers();
    const toast = useToast();

    // Dados
    const cashRegisters = ref<CashRegister[]>([
        {
            id: 1,
            name: "Caixa 1",
            status: "open",
            currentValue: 1500.75,
            lastOpening: new Date(),
            lastClosure: null,
            user: "Operador 1",
        },
        {
            id: 2,
            name: "Caixa 2",
            status: "closed",
            currentValue: 0,
            lastOpening: null,
            lastClosure: new Date("2023-12-20T18:30:00"),
            user: "Operador 2",
        },
    ]);

    // Colunas
    const columns: ColumnDef<CashRegister>[] = [
        {
            accessorKey: "name",
            header: "Nome",
            size: 150,
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 120,
            cell: ({ getValue }) => {
                const status = getValue() as string;
                const { class: statusClass, text } = getCashRegisterStatusBadge(status);
                return `<span class="status-badge ${statusClass}">${text}</span>`;
            },
        },
        {
            accessorKey: "currentValue",
            header: "Valor Atual",
            size: 150,
            cell: ({ getValue }) => formatCurrency(getValue() as number),
        },
        {
            accessorKey: "lastOpening",
            header: "Última Abertura",
            size: 180,
            cell: ({ getValue }) => formatDate(getValue() as Date | null),
        },
        {
            accessorKey: "lastClosure",
            header: "Último Fechamento",
            size: 180,
            cell: ({ getValue }) => formatDate(getValue() as Date | null),
        },
        {
            accessorKey: "user",
            header: "Responsável",
            size: 150,
        },
        {
            id: "actions",
            header: "Ações",
            enableSorting: false,
            size: 180,
        },
    ];

    // Ações
    const handleNewCashRegister = () => {
        const newId = Math.max(0, ...cashRegisters.value.map((cr) => cr.id)) + 1;
        cashRegisters.value.push({
            id: newId,
            name: `Caixa ${newId}`,
            status: "closed",
            currentValue: 0,
            lastOpening: null,
            lastClosure: null,
            user: "--",
        });
        toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Novo caixa adicionado!",
            life: 3000,
        });
    };

    const handleOpenCashRegister = (id: number) => {
        const cashRegister = cashRegisters.value.find((cr) => cr.id === id);
        if (cashRegister) {
            cashRegister.status = "open";
            cashRegister.lastOpening = new Date();
            cashRegister.user = "Usuário Atual";
            toast.add({
                severity: "success",
                summary: "Sucesso",
                detail: "Caixa aberto com sucesso!",
                life: 3000,
            });
        }
    };

    const handleCloseCashRegister = (id: number) => {
        const cashRegister = cashRegisters.value.find((cr) => cr.id === id);
        if (cashRegister) {
            cashRegister.status = "closed";
            cashRegister.lastClosure = new Date();
            toast.add({
                severity: "error",
                summary: "Sucesso",
                detail: "Caixa fechado com sucesso!",
                life: 3000,
            });
        }
    };

    const handleViewDetails = (id: number) => {
        router.push({ path: `/admin/cash-register/${id}/edit` });
    };

    return {
        cashRegisters,
        columns,
        formatCurrency,
        formatDate,
        getStatusBadge: getCashRegisterStatusBadge,
        handleNewCashRegister,
        handleOpenCashRegister,
        handleCloseCashRegister,
        handleViewDetails,
    };
}
