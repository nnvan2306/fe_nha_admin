import { useEffect, useState } from "react";

const usePagination = ({
    api,
    page,
    pageSize,
    is_load_more = false,
    is_reload = false,
}) => {
    // const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState(null);
    const [pagination, setPagination] = useState({
        page: page,
        pageSize: pageSize,
    });

    useEffect(() => {
        const _fetch = async () => {
            let res;
            // setIsLoading(true);
            try {
                res = await api({
                    page: pagination.page,
                    pageSize: pagination.pageSize,
                });
                if (res) {
                    setMeta(res.data.meta);
                    if (is_load_more) {
                        setData((prev) => [...prev, ...res.data.items]);
                    } else {
                        setData(res.data.items);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        _fetch();
    }, [api, pagination.page, pagination.pageSize, is_load_more, is_reload]);

    const handleChangePage = (page) => {
        if (meta) {
            if (page >= 0 && page <= meta.totalPages) {
                setPagination({
                    page: page,
                    pageSize: pagination.pageSize,
                });
            }
        }
    };
    return { data, meta, handleChangePage };
};

export default usePagination;
