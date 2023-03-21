import { w, W } from 'windstitch';

export const UIButton = w.button(
    `
ml-3 
inline-flex 
justify-center 
rounded-md 
py-2 
px-4 
antialiased
font-medium 
shadow-sm
focus:outline-none
focus:ring-2 
focus:ring-primary-500 
focus:ring-offset-2`,
    {
        variants: {
            color: {
                primary: 'border-transparent bg-primary-800 text-white hover:bg-primary-600',
                secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-200',
                delete: 'border-transparent bg-red-700 text-white hover:bg-red-500'
            },
            text: {
                normal: 'text-sm',
                big: 'text-lg'
            }

        },
        defaultVariants: {
            text: 'normal',
            color: 'primary'
        }
    }
);

export type UIButtonProps = W.Infer<typeof UIButton>
