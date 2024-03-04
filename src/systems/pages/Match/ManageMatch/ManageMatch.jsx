import classNames from "classnames/bind";
import styles from "./ManageMatch.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonService } from "../../../../service/seasonService";
import { getMatchService } from "../../../../service/matchService";
import usePagination from "../../../../hooks/usePagination";
import { Pagination } from "antd";
import { BASE_URL } from "../../../../utils/constants";

const cx = classNames.bind(styles);

export default function ManageMatch() {
    const [listSeason, setListSeason] = useState([]);
    // const [isReload, setIsReload] = useState(false);

    const { data, meta, handleChangePage, handleChangeValueSearch } =
        usePagination({
            api: getMatchService,
            page: 1,
            pageSize: 5,
            q: 0,
            is_load_more: false,
            is_reload: false,
        });

    const handleChangeSeason = (e) => {
        handleChangeValueSearch(+e);
    };

    useEffect(() => {
        console.log("a");
        const _fetch = async () => {
            let res = await getAllSeasonService();
            if (res.errorCode === 0) {
                setListSeason(
                    res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
            }
        };
        _fetch();
    }, []);
    console.log(data[0]?.Teams);

    return (
        <div className={cx("form-manage")}>
            <div className={cx("input-select")}>
                <select
                    name=""
                    id=""
                    onChange={(e) => handleChangeSeason(e.target.value)}
                >
                    <option value={0}>Choose season</option>
                    {listSeason &&
                        listSeason.length > 0 &&
                        listSeason.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className={cx("form-table")}>
                <table>
                    <thead>
                        <tr>
                            <th className={cx("th-team")}>Team</th>
                            <th className={cx("th-score")}>Score</th>
                            <th className={cx("th-video")}>Video</th>
                            <th className={cx("th-action")}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx("td-team")}>
                                            <div className="row">
                                                <div
                                                    className={cx(
                                                        "col-5",
                                                        "col-logo"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "logo-team"
                                                        )}
                                                    >
                                                        <img
                                                            src={`${BASE_URL}${item.Teams[0].logo_url}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "col-2",
                                                        "col-text"
                                                    )}
                                                >
                                                    <p>Vs</p>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "col-5",
                                                        "col-logo"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "logo-team"
                                                        )}
                                                    >
                                                        <img
                                                            src={`${BASE_URL}${item.Teams[1].logo_url}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx("td-score")}></td>
                                        <td className={cx("video")}></td>
                                        <td className={cx("action")}></td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            {meta && meta.currentPage <= meta.totalPages && (
                <Pagination
                    className={cx("form-pagination")}
                    defaultCurrent={1}
                    total={meta.totalIteams}
                    pageSize={5}
                    // onChange={handleChangePagination}
                />
            )}
        </div>
    );
}
