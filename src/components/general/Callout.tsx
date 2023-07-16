import React from 'react';

export default function Callout(
    { variant = 'info', languageCode, title, children }:
        { variant: "info" | "danger" | "success", languageCode: 'ar' | 'en', title: string, children: React.ReactNode }) {
    const commonClasses = "border-solid px-3"
    const variantStyles = {
        info: `${languageCode === 'en' ? "border-l-4" : "border-r-4"} border-blue-500 bg-cyan-500/25 `,
        danger: `${languageCode === 'en' ? "border-l-4" : "border-r-4"} border-[#f44336] bg-red-900`,
        success: `${languageCode === 'en' ? "border-l-4" : "border-r-4"} border-green-500 bg-green-900`,
    }

    return (
        <aside className={`flex flex-col my-2 ${variantStyles[variant]} ${commonClasses}`} dir={languageCode === 'en' ? "ltr" : "rtl"}>
            <div className='flex text-white font-bold gap-3 mt-3 pb-2'>
                {variant === "danger" &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                {variant === "info" &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                }

                {variant === "success" &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                {title}
            </div>
            {children}
        </aside>
    );
}