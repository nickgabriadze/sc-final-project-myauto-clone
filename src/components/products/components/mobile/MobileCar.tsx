import { Product } from "../../productsInterfaces";
import mobileCarStyling from "./mobileCar.module.css";
import carProductsStyling from "../../carProducts.module.css";
import GELSVG from "../../../search/icons/gel-black.svg";
import GreenCheckSVG from "../../icons/greenCheck.svg";
import USDSVG from "../../../search/icons/dollar-black.svg";
import GeorgiaSVG from "../../icons/georgia.svg";
import NoCarImageSVG from "../../icons/nocarImage.svg";
import FavoriteWhiteSVG from "../../icons/favoriteWhite.svg";
import severalIDMappings from "../../helpers/mappings";
import { Category } from "../../../search/searchInterfaces";
import HotSVG from "../../icons/hot.svg";
import formatDateDifference from "../../helpers/dateFormatter";
import NoteSVG from "../../icons/note.svg";
import CompareSVG from "../../icons/compare.svg";

function MobileCar({
  car,
  modelNameLoading,
  modelName,
  currency,
  imgError,
  setImgError,
  engineVolume,
  cats,
}: {
  car: Product;
  modelNameLoading: boolean;
  modelName: string;
  currency: boolean;
  imgError: boolean;
  setImgError: React.Dispatch<React.SetStateAction<boolean>>;
  engineVolume: string;
  cats: Category[];
}) {
  const categoryTitle = cats?.filter(
    (cat) => cat.category_id === car.category_id
  )[0]?.title;

  return (
    <div className={mobileCarStyling["mobile-car-outer-wrapper"]}>
      <div className={mobileCarStyling["mobile-car-wrapper"]}>
        <div className={mobileCarStyling["car-model-header"]}>
          {car.tech_inspection && (
            <div className={mobileCarStyling["tech-inspection-vip"]}>VIP</div>
          )}

          <p
            style={{
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {modelNameLoading ? "Loading..." : modelName}
          </p>
          <p style={{ color: "#8C929B", fontWeight: "bold", fontSize: "14px" }}>
            {car.prod_year} წ
          </p>
        </div>

        <div className={mobileCarStyling["price-customs"]}>
          <div className={carProductsStyling["price"]}>
            {car.price !== 0 ? (
              <div>
                <p className={carProductsStyling["price-set"]}>
                  {currency
                    ? new Intl.NumberFormat().format(
                        Number(car.price_usd.toFixed(1))
                      )
                    : new Intl.NumberFormat().format(
                        Number(car.price_value.toFixed(1))
                      )}
                </p>

                <img
                  src={currency ? USDSVG : GELSVG}
                  width={26}
                  height={24}
                  alt="Currency icon"
                ></img>
              </div>
            ) : (
              <p className={mobileCarStyling["price-not-set"]}>
                ფასი შეთანხმებით
              </p>
            )}
          </div>
          {car.for_rent && (
            <div className={carProductsStyling["for-rent-sticker"]}>
              ქირავდება
            </div>
          )}
          <div
            className={mobileCarStyling["customs"]}
            style={
              car.customs_passed
                ? {
                    backgroundColor: "#EEFBF1",
                  }
                : { backgroundColor: "#fbeeee" }
            }
          >
            {car.customs_passed ? (
              <div style={{ display: "flex", gap: "3px" }}>
                <img
                  src={GreenCheckSVG}
                  className="Customs passed icon check"
                ></img>
                <p style={{ color: "#26B753", fontSize: "10px" }}>
                  განბაჟებული
                </p>
              </div>
            ) : (
              <p style={{ color: "#FF3B30", fontSize: "10px" }}>
                განბაჟება 2,176 ₾
              </p>
            )}
          </div>
        </div>

        <div
          className={mobileCarStyling["car-visual-picture"]}
          style={
            imgError
              ? {
                  backgroundColor: "#d8dbe2",
                  borderRadius: "10px",
                  objectFit: "cover",
                }
              : { position: "relative", zIndex: 1 }
          }
        >
          <img
            src={
              !imgError
                ? `https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`
                : NoCarImageSVG
            }
            className={mobileCarStyling["car-img"]}
            onError={() => setImgError(true)}
            draggable={false}
            alt="Car picture"
          ></img>
          <img
            className={mobileCarStyling["favorite-icon"]}
            src={FavoriteWhiteSVG}
            alt="Favorite icon"
            width={20}
            height={20}
          ></img>
        </div>

        <div className={mobileCarStyling["car-info"]}>
          <div className={mobileCarStyling["run-fuel-gear"]}>
            <p>{car.car_run_km} კმ</p>
            <p>
              {engineVolume} {severalIDMappings.fuelTypeIds[car.fuel_type_id]}
            </p>

            <p>{severalIDMappings.gearTypeIds[car.gear_type_id]}</p>
          </div>

          <div className={mobileCarStyling["cat-wheel-location"]}>
            <p>{categoryTitle}</p>
            <p>{car.right_wheel ? "საჭე მარჯვნივ" : "საჭე მარცხნივ"}</p>
            <div className={carProductsStyling["country-place"]}>
              <img src={GeorgiaSVG} alt="Georgia country icon"></img>
              <p>{severalIDMappings.locations[car.location_id]}</p>
            </div>
          </div>

          <div></div>
        </div>
      </div>
      <div className={mobileCarStyling["views-date-icons"]}>
        <div className={mobileCarStyling['views-date']}>
          <img src={HotSVG} alt="Hot flames icon"></img>
          <p>{car.views} ნახვა</p>•
          <p>{formatDateDifference(new Date(car.order_date))}</p>
        </div>
        <div>
          <img src={CompareSVG} alt="Compare cars icon"></img>
          <img
            className={carProductsStyling["note-icon"]}
            src={NoteSVG}
            alt="Note icon"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MobileCar;
