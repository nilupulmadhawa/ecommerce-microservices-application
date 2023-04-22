import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';

import { likePost } from '../services/post';
import { useAuthContext } from "../context/AuthContext";

export default function Feeds(props) {
    const [likes, setLikes] = React.useState(props.likes)
    const { user } = useAuthContext();
    const _likePost = async () => {

        await likePost(props.id).then((res) => {
            if (res.success) {
                if (likes.some(p => p.toString() == user._id.toString())) {
                    setLikes(likes.filter(p => p.toString() != user._id.toString()))
                } else {
                    setLikes([...likes, user._id])
                }

            } else {
                alert.error(res.message);
            }
        })
    }

    useEffect(() => {
        setLikes(props.likes)
    }, [props.likes])

    return (
        <div className="feeds">
            <div className="feed-wrapper mb-4">
                <div className="feed-item border border-gray-400 rounded bg-white">
                    <div className="feed-img">
                        <LazyLoadImage
                            key={props._id}
                            alt={"image"}
                            src={props.imageUrl} // use normal <img> attributes as props
                            width="100%"
                            placeholderSrc="./assets/gray.png"
                            visibleByDefault={props.imageUrl === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpGBcBD_tP2vS5zWd7YGEZ0S-qtfygFhqZrfV6XB9AS3yvFGOu02BHw_5ocf2ail3FKk4&usqp=CAU'}
                            className="object-cover aspect-square w-full" />
                    </div>
                    <div className="card-footer p-4">
                        <div className="top">
                            <div className="icons flex flex-row justify-between items-center">
                                <div className="left flex flex-row">
                                    <div className="like mr-2 text-xl">
                                        <button onClick={_likePost}>
                                            {
                                                likes.some(p => p.toString() == user._id.toString()) ?
                                                    <FontAwesomeIcon icon={solid('heart')} className="text-[#fc1135] " /> :
                                                    <FontAwesomeIcon icon={regular('heart')} />
                                            }
                                        </button>
                                    </div>
                                    <div>
                                        <span className="text-xs">
                                            {likes.length} likes
                                        </span>
                                    </div>
                                </div>
                                <div className="center flex flex-row">
                                    <span className="text-lg font-semibold ">{props?.userName}</span>
                                </div>
                                <div className="right">
                                    <div className="save">
                                        <span className="text-xs text-gray-900">
                                            {moment.utc(props.created_at).local().startOf('seconds').fromNow()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
