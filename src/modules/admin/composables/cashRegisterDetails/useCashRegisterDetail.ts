import { ref } from "vue";
import type { OpenCashSessionRequest } from "@/api/generated";
import { getCashRegisterSession, openCashSession } from "@/modules/admin/services/cashRegisterService";

export type CashRegisterMode = "open" | "view";

export function useCashRegisterDetail() {
    const loading = ref(false);
    const mode = ref<CashRegisterMode>("open");

    const form = ref<OpenCashSessionRequest>({
        cashRegisterName: "",
        location: "",
        openingFloatAmount: 0,
        overrideCode: "",
    });

    // ==========================
    // Carrega sessão do caixa
    // ==========================
    const loadCashRegisterById = async (cashRegisterId: string) => {
        loading.value = true;
        try {
            const session = await getCashRegisterSession(cashRegisterId);

            if (session) {
                mode.value = "view";

                form.value = {
                    cashRegisterName: "",
                    location: "",
                    openingFloatAmount: session.openingFloatAmount,
                    overrideCode: "",
                };
            }
        } catch {
            // Não existe sessão → pode abrir
            mode.value = "open";
        } finally {
            loading.value = false;
        }
    };

    // ==========================
    // Abrir caixa
    // ==========================
    const submit = async () => {
        if (mode.value !== "open") return;

        loading.value = true;
        try {
            await openCashSession(form.value);
            mode.value = "view";
            return true;
        } finally {
            loading.value = false;
        }
    };

    const resetForm = () => {
        form.value = {
            cashRegisterName: "",
            location: "",
            openingFloatAmount: 0,
            overrideCode: "",
        };
        mode.value = "open";
    };

    return {
        form,
        mode,
        loading,
        loadCashRegisterById,
        submit,
        resetForm,
    };
}
