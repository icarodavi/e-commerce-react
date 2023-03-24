import { w } from 'windstitch';

export const UISPinner = w.div(`
    border-8
    border-gray-200
    rounded-full
    
    border-t-8
    animate-spin
    `, {
    variants: {
        color: {
            primary: 'border-t-indigo-800',
            red: 'border-t-red'
        },
        size: {
            small: 'h-6 w-6 border-4 border-t-4',
            medium: 'h-16 w-16 border-8 border-t-8'
        }
    },
    defaultVariants: {
        color: 'primary',
        size: 'small'
    }
});
