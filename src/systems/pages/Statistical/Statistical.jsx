import classNames from "classnames/bind";
import styles from "./Statistical.module.scss";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { searchPlayerService } from "../../../service/playerService";
import { BASE_URL } from "../../../utils/constants";
import moment from "moment";
const cx = classNames.bind(styles);

export default function Statistical() {
    const [textSearch, setTextSearch] = useState("");
    const [playerView, setPlayerView] = useState(null);
    const [isOptionItems, setIsOptionItems] = useState(false);
    const [listPlayers, setListPlayers] = useState([]);

    const debounce = useDebounce(textSearch, 700);

    useEffect(() => {
        const fetch = async () => {
            let res = await searchPlayerService(debounce);
            if (res.errorCode === 0) {
                setListPlayers(res?.data?.items);
            }
        };
        if (debounce) {
            fetch();
            setIsOptionItems(true);
        } else {
            setIsOptionItems(false);
        }
    }, [debounce]);

    const handleView = (player) => {
        setIsOptionItems(false);
        setPlayerView(player);
    };

    console.log(playerView);

    return (
        <div className={cx("form-statistical")}>
            <h4>Manage Statistical</h4>
            <div className={cx("form-search")}>
                <div className={cx("input-search")}>
                    <input
                        type="text"
                        placeholder="Please enter the procedure code or name"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                </div>
                <div className={cx("icon-search")}>
                    <i className="bi bi-search"></i>
                </div>
            </div>
            {isOptionItems && (
                <div className={cx("form-items")}>
                    {listPlayers &&
                        listPlayers.length > 0 &&
                        listPlayers.map((item, index) => {
                            return (
                                <div
                                    className={cx("item")}
                                    key={index}
                                    onClick={() => handleView(item)}
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                </div>
            )}
            {playerView && (
                <div className={cx("form-content", "container")}>
                    <div className={cx("row")}>
                        <div className={cx("col-6")}>
                            <div className={cx("form-img")}>
                                <img
                                    src={`${BASE_URL}${playerView?.avatar_url}`}
                                    alt=""
                                />
                                <div className={cx("info")}>
                                    <p className={cx("name")}>
                                        {playerView?.name}
                                    </p>
                                    <p className={cx("birthday")}>
                                        {moment(playerView.birthday).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </p>
                                    <p className={cx("nationality")}>
                                        nationality :
                                        <span> {playerView.nationality}</span>
                                    </p>
                                    <p className={cx("height")}>
                                        Height :
                                        <span> {playerView.height}</span>
                                    </p>
                                    <p className={cx("weight")}>
                                        weight :
                                        <span> {playerView.weight}</span>
                                    </p>
                                </div>
                            </div>

                            <div className={cx("form-detail")}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: playerView.description,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className={cx("col-6", "form-statistical")}>
                            <h5 style={{ textAlign: "center" }}>Statistical</h5>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
