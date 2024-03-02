import React from "react";
import AdminPageLayout from "../Layouts/AdminPageLayout";
import PrimaryButton from "../../Components/Shared/PrimaryButton";
import BorrowedBooks from "../../Components/AdminPage/BorrowedBooks";
import XLSX from "xlsx-js-style";

export default function BorrowedBooksPage({user, borrowedBooks}) {
    // gets base url
    const baseUrl = import.meta.env.VITE_BASE_URL;

    // 
    const handleExportClick = () => {
        // rows
        var rows = [];

        // add column headers
        rows.push([
            {
                v: "NO",
                s: {
                    font: {
                        sz: 20,
                        bold: true,
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    },
                    border: {
                        top: {
                            style: 'medium',
                            color: '000000'
                        },
                        bottom: {
                            style: 'medium',
                            color: '000000'
                        },
                        left: {
                            style: 'medium',
                            color: '000000'
                        },
                        right: {
                            style: 'medium',
                            color: '000000'
                        },
                    },
                }
            },
            {
                v: "Buku",
                s: {
                    font: {
                        sz: 20,
                        bold: true
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    },
                    border: {
                        top: {
                            style: 'medium',
                            color: '000000'
                        },
                        bottom: {
                            style: 'medium',
                            color: '000000'
                        },
                        right: {
                            style: 'medium',
                            color: '000000'
                        },
                    },
                }
            },
            {
                v: "Peminjam",
                s: {
                    font: {
                        sz: 20,
                        bold: true
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    },
                    border: {
                        top: {
                            style: 'medium',
                            color: '000000'
                        },
                        bottom: {
                            style: 'medium',
                            color: '000000'
                        },
                        right: {
                            style: 'medium',
                            color: '000000'
                        },
                    },
                }
            },
            {
                v: "Tanggal Peminjaman",
                s: {
                    font: {
                        sz: 20,
                        bold: true
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    },
                    border: {
                        top: {
                            style: 'medium',
                            color: '000000'
                        },
                        bottom: {
                            style: 'medium',
                            color: '000000'
                        },
                        right: {
                            style: 'medium',
                            color: '000000'
                        },
                    },
                }
            },
            {
                v: "Tanggal Pengembalian",
                s: {
                    font: {
                        sz: 20,
                        bold: true
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    },
                    border: {
                        top: {
                            style: 'medium',
                            color: '000000'
                        },
                        bottom: {
                            style: 'medium',
                            color: '000000'
                        },
                        right: {
                            style: 'medium',
                            color: '000000'
                        },
                    },
                }
            },
            {
                v: "Status Pinjaman",
                s: {
                    font: {
                        sz: 20,
                        bold: true
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    },
                    border: {
                        top: {
                            style: 'medium',
                            color: '000000'
                        },
                        bottom: {
                            style: 'medium',
                            color: '000000'
                        },
                        right: {
                            style: 'medium',
                            color: '000000'
                        },
                    },
                }
            }
        ]);

        // add body rows
        for(let i = 0; i < borrowedBooks.length; ++i) {
            const borrowedBook = borrowedBooks[i]
            rows.push([
                {
                    v: (i + 1).toString(),
                    s: {
                        font: {
                            sz: 20
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: "center"
                        },
                        border: {
                            top: {
                                style: 'medium',
                                color: '000000'
                            },
                            bottom: {
                                style: 'medium',
                                color: '000000'
                            },
                            right: {
                                style: 'medium',
                                color: '000000'
                            },
                        },
                    }
                },
                {
                    v: borrowedBook.book.Judul,
                    s: {
                        font: {
                            sz: 20
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: "center"
                        },
                        border: {
                            top: {
                                style: 'medium',
                                color: '000000'
                            },
                            bottom: {
                                style: 'medium',
                                color: '000000'
                            },
                            right: {
                                style: 'medium',
                                color: '000000'
                            },
                        },
                    }
                },
                {
                    v: borrowedBook.borrower.NamaLengkap,
                    s: {
                        font: {
                            sz: 20
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: "center"
                        },
                        border: {
                            top: {
                                style: 'medium',
                                color: '000000'
                            },
                            bottom: {
                                style: 'medium',
                                color: '000000'
                            },
                            right: {
                                style: 'medium',
                                color: '000000'
                            },
                        },
                    }
                },
                {
                    v: borrowedBook.TanggalPeminjaman,
                    s: {
                        font: {
                            sz: 20
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: "center"
                        },
                        border: {
                            top: {
                                style: 'medium',
                                color: '000000'
                            },
                            bottom: {
                                style: 'medium',
                                color: '000000'
                            },
                            right: {
                                style: 'medium',
                                color: '000000'
                            },
                        },
                    }
                },
                {
                    v: borrowedBook.TanggalPengembalian,
                    s: {
                        font: {
                            sz: 20
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: "center"
                        },
                        border: {
                            top: {
                                style: 'medium',
                                color: '000000'
                            },
                            bottom: {
                                style: 'medium',
                                color: '000000'
                            },
                            right: {
                                style: 'medium',
                                color: '000000'
                            },
                        },
                    }
                },
                {
                    v: borrowedBook.StatusPeminjaman,
                    s: {
                        font: {
                            sz: 20
                        },
                        alignment: {
                            vertical: "center",
                            horizontal: "center"
                        },
                        border: {
                            top: {
                                style: 'medium',
                                color: '000000'
                            },
                            bottom: {
                                style: 'medium',
                                color: '000000'
                            },
                            right: {
                                style: 'medium',
                                color: '000000'
                            },
                        },
                    }
                },
            ]);
        }

        // create worksheet and workbook
        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Borrowed Books");

        // set row height and get list of column widths
        var widths = [];
        for(var i = 0; i < rows.length; ++i)  {
            // gets item
            const item = rows[i];

            // sets width
            for(var j = 0; j < item.length; ++j) {
                // gets item
                const item2 = item[j];

                // create cols array if does not exist
                if(!worksheet["!cols"]) worksheet["!cols"] = [];   

                // create column metadata object if it does not exist
                if(!worksheet["!cols"][j]) worksheet["!cols"][j] = {wch: j};

                // gets width
                const text = item2.v.toString();
                const fontSize = (item2.s == null || item2.s.font == null || item2.s.font.sz == null) ? 0 : item2.s.font.sz;
                var width = ((text.length * fontSize) / 2) + 40;

                // create width object if not exists
                if(!widths[j]) widths[j] = [];

                // push
                widths[j].push(width);

                // sets width
                // worksheet["!cols"][j].wpx = width;
            }

            // create !rows array if it does not exist
            if(!worksheet["!rows"]) worksheet["!rows"] = [];

            // create row metadata object if it does not exist
            if(!worksheet["!rows"][i]) worksheet["!rows"][i] = {hpx: 50};

            /* set row height */
            worksheet["!rows"][i].hpx = 30;
        }

        // sets widths for each column
        for(var i = 0; i < widths.length; ++i) {
            var cellWidths = widths[i];
            var largest = Math.max(...cellWidths);

            worksheet["!cols"][i].wpx = largest;
        }

        // downloads file
        XLSX.writeFile(workbook, "Laporan Peminjaman Buku.xlsx", { compression: false });
    }

    return (
        <AdminPageLayout user={user}>
            <div className="flex justify-end mb-5">
                <PrimaryButton onClick={handleExportClick}>
                    Export
                </PrimaryButton>
                
            </div>
            <BorrowedBooks borrowedBooks={borrowedBooks}/>
        </AdminPageLayout>
    )
}