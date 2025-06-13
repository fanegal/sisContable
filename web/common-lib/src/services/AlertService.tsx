import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';

const MySwal = withReactContent(Swal);

interface AlertOptions {
    title: string | React.ReactNode;
    message: string | React.ReactNode;
    cssClass?: string;
    acceptAction?: () => void;
    cancelAction?: () => void;
    hasCancel?: boolean;
}

const AlertService = {
    show: async ({
        title,
        message,
        cssClass,
        acceptAction,
        cancelAction,
        hasCancel = false,
    }: AlertOptions) => {
         await MySwal.fire({
            title: <>{title}</>,
            html: <>{message}</>,
            customClass: {
                popup: cssClass || '',
            },
            showCancelButton: hasCancel,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            allowOutsideClick: true, // ⬅️ permite cerrar al hacer click fuera
            allowEscapeKey: true,     // ⬅️ permite cerrar con Esc
            backdrop: true,
            didOpen: () => {
                // Para asegurarse de que botones funcionen si usas HTML React
                const confirmBtn = document.querySelector('.swal2-confirm') as HTMLButtonElement;
                const cancelBtn = document.querySelector('.swal2-cancel') as HTMLButtonElement;

                confirmBtn?.addEventListener('click', () => {
                    if (acceptAction) acceptAction();
                    MySwal.close(); // ⬅️ Forzamos cierre
                });

                cancelBtn?.addEventListener('click', () => {
                    if (cancelAction) cancelAction();
                    MySwal.close(); // ⬅️ Forzamos cierre
                });
            },
            // Este evita que se quede pegado
            willClose: () => {
                // Limpieza si necesitas
            },
        });
    },
    showWithComponent: async ({
        title,
        component,
        cssClass,
        acceptAction,
        cancelAction,
        hasCancel = false,
    }: {
        title: string | React.ReactNode;
        component: React.ReactNode;
        cssClass?: string;
        acceptAction?: () => void;
        cancelAction?: () => void;
        hasCancel?: boolean;
    }) => {
        const result = await MySwal.fire({
            title: <>{title}</>,
            html: <>{component}</>,
            customClass: {
                popup: cssClass || '',
            },
            showCancelButton: hasCancel,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });

        if (result.isConfirmed && acceptAction) acceptAction();
        if (result.isDismissed && cancelAction) cancelAction();
    },
};

export default AlertService;
