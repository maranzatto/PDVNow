import { twMerge } from "tailwind-merge";
import { mergeProps } from "vue";

type PTProps = {
    class?: string | string[];
    [key: string]: unknown;
};

export const ptViewMerge = (
    globalPTProps: PTProps = {},
    selfPTProps: PTProps = {},
    datasets: Record<string, unknown> = {}
) => {
    const { class: globalClass, ...globalRest } = globalPTProps;
    const { class: selfClass, ...selfRest } = selfPTProps;

    return mergeProps({ class: twMerge(globalClass, selfClass) }, globalRest, selfRest, datasets);
};

// Versão anterior
// import { twMerge } from 'tailwind-merge';
// import { mergeProps } from 'vue';

// export const ptViewMerge = (globalPTProps = {} as any, selfPTProps = {} as any, datasets: any) => {
//     const { class: globalClass, ...globalRest } = globalPTProps;
//     const { class: selfClass, ...selfRest } = selfPTProps;

//     return mergeProps({ class: twMerge(globalClass, selfClass) }, globalRest, selfRest, datasets);
// };
