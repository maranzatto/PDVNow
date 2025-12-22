import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useHelpers() {
    // Formatação de moeda
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    // Formatação de data
    const formatDate = (date: Date | null | undefined, formatString = "dd/MM/yyyy HH:mm"): string => {
        if (!date) return "--/--/---- --:--";
        return format(date, formatString, { locale: ptBR });
    };

    // Formatação de CPF
    const formatCPF = (cpf: string): string => {
        if (!cpf) return "";
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    // Formatação de CNPJ
    const formatCNPJ = (cnpj: string): string => {
        if (!cnpj) return "";
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    };

    // Formatação de telefone
    const formatPhone = (phone: string): string => {
        if (!phone) return "";
        // Remove tudo que não for dígito
        const cleaned = phone.replace(/\D/g, "");

        if (cleaned.length === 11) {
            return cleaned.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (cleaned.length === 10) {
            return cleaned.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
        }
        return phone;
    };

    // Helper para badge de status genérico
    const getStatusBadge = (status: string, statusMap: Record<string, { class: string; text: string }>) => {
        return statusMap[status] || { class: "badge-secondary", text: status };
    };

    // Helper para status de produto
    const getProductStatusBadge = (status: string) => {
        const statusMap = {
            available: { class: "badge-success", text: "Disponível" },
            out_of_stock: { class: "badge-warning", text: "Sem Estoque" },
            discontinued: { class: "badge-inactive", text: "Descontinuado" },
        };
        return getStatusBadge(status, statusMap);
    };

    // Helper para status de fornecedor
    const getSupplierStatusBadge = (status: string) => {
        const statusMap = {
            active: { class: "badge-success", text: "Ativo" },
            inactive: { class: "badge-inactive", text: "Inativo" },
        };
        return getStatusBadge(status, statusMap);
    };

    // Helper para status de caixa
    const getCashRegisterStatusBadge = (status: string) => {
        const statusMap = {
            open: { class: "status-open", text: "Aberto" },
            closed: { class: "status-closed", text: "Fechado" },
        };
        return getStatusBadge(status, statusMap);
    };

    // Helper para classe de estoque
    const getStockClass = (stock: number): string => {
        if (stock === 0) return "text-error";
        if (stock < 10) return "text-warning";
        return "text-success";
    };

    return {
        formatCurrency,
        formatDate,
        formatCPF,
        formatCNPJ,
        formatPhone,
        getStatusBadge,
        getProductStatusBadge,
        getSupplierStatusBadge,
        getCashRegisterStatusBadge,
        getStockClass,
    };
}
