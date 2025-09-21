import { Playfair, Lora } from 'next/font/google';
 
export const playfair = Playfair({ 
    weight: ['400', '700', '900'], 
    style: ['normal', 'italic'] ,
  variable: '--font-playfair'});

export const lora = Lora({
    weight: "variable",
    style: ["normal", "italic"],
    variable: '--font-lora'
});