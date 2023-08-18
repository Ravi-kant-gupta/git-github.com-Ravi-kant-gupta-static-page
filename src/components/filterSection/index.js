import { Component } from "react";
import  "./index.css";
import ReactImageMagnify from 'react-image-magnify';

class FilterSection extends Component{
      state = { largeImage:  ""
      }
    changeImage=(image)=>{
        this.setState({largeImage:image})
    }
    
    render(){
        const {largeImage}=this.state;
        const {back_view_image,front_straight_view_image,front_view_image,lady_with_chair_image}=this.props.item;
        return(
            <div className="Filter">
                <ul>
                    <li onMouseEnter={()=>this.changeImage(back_view_image)}>
                        <img src={back_view_image} alt=""/>
                    </li>
                    <li onMouseEnter={()=>this.changeImage(front_straight_view_image)}>
                        <img src={front_straight_view_image} alt=""/>
                    </li>
                    <li onMouseEnter={()=>this.changeImage(front_view_image)}>
                        <img src={front_view_image} alt=""/>
                    </li>
                    <li onMouseEnter={()=>this.changeImage(lady_with_chair_image)}>
                        <img src={lady_with_chair_image} alt=""/>
                    </li>
                </ul>
                <div className="large-image">

                
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'itemImage',
                        isFluidWidth: true,
                        src: back_view_image===largeImage || front_straight_view_image===largeImage||front_view_image===largeImage||lady_with_chair_image===largeImage?largeImage:back_view_image,
                    },
                    largeImage: {
                        src: back_view_image===largeImage || front_straight_view_image===largeImage||front_view_image===largeImage||lady_with_chair_image===largeImage?largeImage:back_view_image,
                        width: 2800,
                        height: 2800
                    }
                }} />
                </div>
            </div>
        )
    }
    
}

export default FilterSection;