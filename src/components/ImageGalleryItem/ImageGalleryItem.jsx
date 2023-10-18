
import { ModalImg } from "components/Modal/Modal";
import { useState } from "react"
import { ListElem } from "./ImageGalleryItem.styled";
import { ImgElem } from "components/ImageGallery/ImageGallery.styled";




export const ImageGalleryItem= (props) =>{
const [isModalOpen, setIsModalOpen] = useState(false)

 const openModal = () => {
    setIsModalOpen(true)
  };

 const closeModal = () => {
    setIsModalOpen(false)
  };

  const {img: {id,webformatURL,largeImageURL}} = props
  return (<ListElem id={id}>
       <ImgElem 
      onClick={openModal} 
      src={webformatURL} 
      alt="" 
      />
    
      <ModalImg 
      isState={isModalOpen}
      src={largeImageURL}
      closeModal={closeModal}
      />
    </ListElem>)
}



// export class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   openModal = () => {
//     this.setState({ isModalOpen: true });
//   };

//   closeModal = () => {
//     this.setState({ isModalOpen: false });
//   };

//   render(){
//     const {img: {id,webformatURL,largeImageURL}} = this.props

//     return (<ListElem id={id}>
//   <ImgElem 
//   onClick={this.openModal} 
//   src={webformatURL} 
//   alt="" 
//   />

//   <ModalImg 
//   isState={this.state.isModalOpen}
//   src={largeImageURL}
//   closeModal={this.closeModal}
//   />
// </ListElem>)
//   }
// }