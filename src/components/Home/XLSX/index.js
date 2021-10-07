import React from 'react';
import { toast } from 'react-toastify';
import { downloadStats } from '../../../api';


const XLSX = props => {

    const download = () => {
        downloadStats()
        .then(res => {
            console.log(res);
            const linkSource = `data:application/xlsx;base64,${res}`;
            const downloadLink = document.createElement("a");
            const fileName = "statystyki.xlsx";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        })
        .catch(err => {
            console.log(err);
            toast.error('Coś poszło nie tak');
        })
    }

    return(
        <div>
            {props.auth &&
                <div className="mt-5 pt-5">
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={download}
                        >
                            Pobierz statystyki
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default XLSX;