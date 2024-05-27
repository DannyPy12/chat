import React from 'react'
import "./detail.css"
import { auth, db } from '../lib/firebase'
import { useChatStore } from '../lib/chatStore'
import { useUserStore } from '../lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Detail = () => {

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()

    const { currentUser } = useUserStore()
  
    const handleBlock = async () => {
        if (!user) return

        const userDocRef = doc(db, 'users', currentUser.id)

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id): arrayUnion(user.id)
            })
            changeBlock()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='detail'>
            <div className="user">
                <img src={user?.avatar || './avatar.png'} alt="" />
                <h2>{user?.username}</h2>
                <p>A punto de morir.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.ytimg.com/vi/bH3DIkNSky0/maxresdefault.jpg" alt="" />
                                <span>red.png</span>
                            </div>
                            <img src="./download.png" alt=""className='icon' />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://th.bing.com/th/id/R.bdebc41e28db5dc3350a89f0c4c8b046?rik=vLL3JJl1i9jCsQ&riu=http%3a%2f%2fimg.izismile.com%2fimg%2fimg2%2f20090811%2fugly_people_23.jpg&ehk=7cfnWvCIIiqU92gUFDxNlVZERZ5cPnPb9nat%2fDkhZh0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" alt="" />
                                <span>jaja.png</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://th.bing.com/th/id/OIP.i-BwyQWeHwwqxnoxFh8cqwHaHW?w=181&h=180&c=7&r=0&o=5&pid=1.7" alt="" />
                                <span>dow.png</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://th.bing.com/th/id/OIP.YjJSBQVO5Cy9RBxwNqfj7AHaJ5?w=135&h=180&c=7&r=0&o=5&pid=1.7" alt="" />
                                <span>pws.png</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                    {
                        isCurrentUserBlocked
                        ? 'You are Blocked!'
                        : isReceiverBlocked
                        ? 'User blocked'
                        : 'Block User'
                    }
                </button>
                <button className='logout' onClick={()=>auth.signOut()}>Logout</button>
            </div>
        </div>
    )
}

export default Detail