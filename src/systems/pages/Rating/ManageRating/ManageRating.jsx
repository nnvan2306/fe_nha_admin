import classNames from "classnames/bind";
import styles from "./ManageRating.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonService } from "../../../../service/seasonService";
import { getRatingService } from "../../../../service/ratingService";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../../utils/constants";

const cx = classNames.bind(styles);

export default function ManageRating() {
    const [listSeasons, setListSeasons] = useState([]);
    const [listRating, setListRating] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllSeasonService();
            if (res.errorCode === 0) {
                setListSeasons(
                    res.data.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })
                );
            }
        };
        fetch();
    }, []);

    const handleGetRating = async (id) => {
        try {
            let res = await getRatingService(id);
            if (res.errorCode === 0) {
                setListRating(res.data);
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: err.response.data.message,
            });
        }
    };

    console.log(listRating);

    return (
        <div className={cx("form-manage", "container")}>
            <div className={cx("form-select-season")}>
                <select onChange={(e) => handleGetRating(e.target.value)}>
                    <option value={0}>choose season</option>
                    {listSeasons &&
                        listSeasons.length > 0 &&
                        listSeasons.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
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
                            <th className={cx("th-logo")}>Logo</th>
                            <th className={cx("th-team")}>Team</th>
                            <th className={cx("th-w-l-d")}>
                                Win - Lose - draw
                            </th>
                            <th className={cx("th-total-goal")}>Total Goal</th>
                            <th className={cx("th-total-lost-goal")}>
                                Toatal Lost Goal
                            </th>
                            <th className={cx("th-action")}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRating &&
                            listRating.length > 0 &&
                            listRating.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={cx("td-logo")}>
                                            <img
                                                src={`${BASE_URL}${item.Team.logo_url}`}
                                                alt=""
                                            />
                                        </td>
                                        <td className={cx("td-team")}>
                                            <p> {item.Team.name}</p>
                                        </td>
                                        <td className={cx("td-w-l-d")}></td>
                                        <td
                                            className={cx("td-total-goal")}
                                        ></td>
                                        <td
                                            className={cx("td-total-lost-goal")}
                                        ></td>
                                        <td className={cx("td-action")}></td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
