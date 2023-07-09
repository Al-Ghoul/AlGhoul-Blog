import '@/app/globals.css';
import Header from '@/components/general/Header';


export default async function MainLayout({
    children, params
}: {
    children: React.ReactNode,
    params: PageProps
}) {
    return (
        <>
            <Header lang={params.lang} />

            {children}
        </>
    )
}



interface PageProps {
    lang: "ar" | "en"
}