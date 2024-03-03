import classNames from "classnames/bind";
import styles from "./ManageMatch.module.scss";
import { useEffect, useState } from "react";
import { getAllSeasonService } from "../../../../service/seasonService";

const cx = classNames.bind(styles);

export default function ManageMatch() {
    const [listSeason, setListSeason] = useState([]);
    const [seasonId, setSeasonId] = useState(0);

    useEffect(() => {
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

    console.log(listSeason);
    return (
        <div className={cx("form-manage")}>
            <div className={cx("input-select")}>
                <select name="" id="">
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

            <div className={cx("form-ttable")}>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
