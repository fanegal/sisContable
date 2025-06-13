import "./content.scss";

export default function Content({ children }: { children: any }) {
    return <section className="content">
        {children}
    </section>
}