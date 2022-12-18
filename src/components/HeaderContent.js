
// get static assets
import imglogo from '../assets/logo.img.webp'

//...
export default function HeaderContent(){

    return (
        <header>

            <h1>HELLO FROM REACT TEST</h1>

            <div class="react-logo">
                <div>
                    <img src={imglogo} alt="⚛"/>
                </div>
            </div>

        </header>
    )

}