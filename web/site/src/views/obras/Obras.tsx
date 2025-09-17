import { DynamicTable, Pagination } from "common-lib";
import { ObraTransactions } from "./components/ObraTransactions/ObraTransactions";
import "./obras.scss";
import { useObrasPresenter } from "./ObrasPresenter";

export default function Obras({ }) {
    const {
        renderOperations,
        setRenderOperations,
        columns,
        data,
        pagination,
        prevPage,
        nextPage,
        goToPage
    } = useObrasPresenter();

<<<<<<< HEAD
    const { onSubmit, renderOperations, setRenderOperations, columns } = useObrasPresenter();

    return <div className="gral-content">
        {renderOperations ? <ObraTransactions setRenderOperations={setRenderOperations} /> : <DynamicTable
            selectable={true}
            singleSelection={true}
            moduleTitle=""
            keyTag="email"
            columns={columns}
            data={[
                { date: '20/12/Dic', fileName: 'Obras.xlsx', status: 'Capturado' },
                { name: 'Luis', email: 'luis@mail.com', phone: '987654321' }
            ]}
            onSelectionChange={(selected) => {
                console.log("Seleccionados:", selected);
            }}
            actions={[
                {
                    title: "Carga manual",
                    icon: "border_color",
                    action: () => {
                        setRenderOperations(true);
                    },
                },
                {
                    title: "Carga masiva",
                    icon: "Upload",
                    action: () => console.log("Editar"),
                },
            ]}
        />}
    </div>
}
=======
    return (
        <div className="gral-content">
            {renderOperations ? (
                <ObraTransactions setRenderOperations={setRenderOperations} />
            ) : (
                <>
                    <DynamicTable
                        selectable={true}
                        singleSelection={true}
                        moduleTitle="Obras"
                        keyTag="id"
                        columns={columns}
                        data={data}
                        onSelectionChange={(selected) => {
                            console.log("Seleccionados:", selected);
                        }}
                        actions={[
                            {
                                title: "Carga manual",
                                icon: "border_color",
                                action: () => setRenderOperations(true),
                            },
                            {
                                title: "Carga masiva",
                                icon: "upload",
                                action: () => console.log("Editar"),
                            },
                        ]}
                    />
                    <Pagination
                        page={pagination.page}
                        limit={pagination.limit}
                        total={pagination.total}
                        onPrev={prevPage}
                        onNext={nextPage}
                        onGoTo={goToPage}
                        window={3}
                    />
                </>
            )}
        </div>
    );
}
>>>>>>> 85287bf2b47ac23b785633b938c52dcc278b855b
