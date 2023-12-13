import { Link, useParams } from 'react-router-dom';
import './css/SingleProduct.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from '../components';
import { FidgetSpinner } from 'react-loader-spinner'
import { useCart } from '../context/Context';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import arrow_icon from '../components/assets/breadcrum_arrow.png';
import star_icon from '../components/assets/star_icon.png';
import star_dull_icon from '../components/assets/star_dull_icon.png';

const SingleProduct = () => {

  const { productId } = useParams();
  const [prod, setProd] = useState({});
  const { userState: { user }, state, dispatch } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => setProd(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleAdd = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: prod
    })
  }

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: prod.id
    })
  }

  const notify = () => {

    toast.info("Please Login First !", {
      position: toast.POSITION.TOP_CENTER
    });

  }

  return (
    <div className='container product'>
      {
        Object.keys(prod).length > 0 ? (
          <>
            <div className="path-section">
              Home <img src={arrow_icon} /> Products <img src={arrow_icon} /> {prod.category} <img src={arrow_icon} /> {prod.title.substring(1,22)}
            </div>
            <div className="product-details">
              <div className="row justify-content-evenly">
                <div className="col-lg-5">
                  <div className="prod-image">
                    <img src={prod.image} />
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="details">
                    {/* Great Stack */}
                    <div className="productdisplay-right">
                      <h1>{prod.title}</h1>
                      <div className="productdisplay-right-start">
                        <img src={star_icon} />
                        <img src={star_icon} />
                        <img src={star_icon} />
                        <img src={star_icon} />
                        <img src={star_dull_icon} />
                        <p>(122)</p>
                      </div>
                    </div>
                    <div className="productdisplay-right-prices">
                      <div className="productdisplay-right-price-old">
                        ${prod.price}
                      </div>
                      <div className="productdisplay-right-price-new">
                        ${Math.floor(prod.price - 5)}
                      </div>
                    </div>
                    <div className="productdisplay-right-description">
                      {prod.description}
                    </div>
                    <div className="productdisplay-right-size">
                      <h1>Select Size</h1>
                      <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXl</div>
                      </div>
                    </div>
                    {
                      state.cart.some((check) => check.id === prod.id) ? (
                        <button
                         className='add-btn'
                         onClick={handleRemove}
                         >
                          REMOVE FROM CART
                         </button>
                      ) : (
                        <>
                          <button
                            className='add-btn'
                            onClick={() => user.status ? handleAdd() : notify()}
                          >
                            ADD TO CART
                          </button>
                          <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                          />
                        </>
                      )
                    }
                    <p className="productdisplay-right-category">
                      <span>Category :</span> {prod.category.toUpperCase()}
                    </p>
                    <p className="productdisplay-right-category">
                      <span>Tags :</span> Modern, Latest
                    </p>
                    {/* Great Stack */}
                    {/* <div className='rating'>
                      <h4>Rating : </h4>
                      <Rating
                        rating={Math.floor(prod.rating.rate)}
                        onClick={() => console.log("Don't do that")}
                      />
                    </div>
                    <div className="add-to-cart">
                      {
                        state.cart.some((check) => check.id === prod.id) ? (
                          <button
                            type="button"
                            className='btn btn-danger'
                            onClick={handleRemove}
                          >
                            Remove From Cart
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className='btn btn-primary'
                              onClick={() => user.status ? handleAdd() : notify()}
                            >
                              Add To Cart
                            </button>
                            <ToastContainer
                              position="top-center"
                              autoClose={5000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light"
                            />
                          </>
                        )
                      }
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='custom-loader'>
            <FidgetSpinner
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              ballColors={['#ff0000', '#00ff00', '#0000ff']}
              backgroundColor="#F4442E"
            />
          </div>
        )
      }
    </div>
  )
}

export default SingleProduct