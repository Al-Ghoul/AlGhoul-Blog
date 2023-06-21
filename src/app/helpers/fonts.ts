

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
  })
   
export const CairoFont = localFont({
    src: '../../../public/fonts/Cairo/Cairo-VariableFont_slnt,wght.ttf',
    display: 'swap',
    variable: '--font-cairo'
})

export const Aref_Ruqaa = localFont({
    src: '../../../public/fonts/Aref_Ruqaa/ArefRuqaaInk-Regular.ttf',
    display: 'swap',
    variable: '--font-aref-regular'
})
