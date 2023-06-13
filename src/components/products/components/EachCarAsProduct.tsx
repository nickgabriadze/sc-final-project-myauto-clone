import carProductsStyling from "../carProducts.module.css";
import { Product } from "../productsInterfaces";
import GreenCheckSVG from "../icons/greenCheck.svg";
import { useEffect, useState } from "react";
import { Category, Manufacturer, Model } from "../../search/searchInterfaces";
import GearBoxSVG from "../icons/gearbox.svg";
import EngineSVG from "../icons/engine.svg";
import OdometerSVG from "../icons/odometer.svg";
import SteeringWheel from "../icons/steeringWheel.svg";
import { useAppSelector } from "../../../features/hooks";
import GELSVG from "../../search/icons/gel-black.svg";
import USDSVG from "../../search/icons/dollar-black.svg";
import formatDateDifference from "../helpers/dateFormatter";
import NoteSVG from "../icons/note.svg";
import CompareSVG from "../icons/compare.svg";
import FavoriteSVG from "../icons/favorite.svg";
import GeorgiaSVG from "../icons/georgia.svg";
import NoCarImageSVG from "../icons/nocarImage.svg";
import MobileCar from "./mobile/MobileCar";
import severalIDMappings from "../helpers/mappings";

function EachCarAsProduct({
  carAsProduct,
  cats,
  mans
}: {
  carAsProduct: Product;
  cats: Category[];
  mans: Manufacturer[]
}) {
  const [modelName, setModelName] = useState<string>("");
  const { currency } = useAppSelector((state) => state.searchReducer);
  const [modelNameLoading, setModelNameLoading] = useState<boolean>(true);

  const eachEngineVolume =
    carAsProduct.engine_volume < 1000
      ? `0.${carAsProduct.engine_volume.toString().slice(0, 1)}`
      : carAsProduct.engine_volume.toString().slice(0, 2).split("").join(".");

  useEffect(() => {
    const abortController = new AbortController();
    setModelNameLoading(true);
    const fetchModels = async () => {
      const request = await fetch(
        `https://api2.myauto.ge/ka/getManModels?man_id=${carAsProduct.man_id}`
      );
      const manModels = request.json();

      return manModels;
    };

   

    try {
      const innerFunc = async () => {
        const fetchedModels: {
          data: Model[];
        } = await fetchModels();

       

        const model = fetchedModels.data.filter(
          (eachModel: Model) => eachModel.model_id === carAsProduct.model_id
        );

        const man = mans.filter(
          (eachMan: Manufacturer) =>
            Number(eachMan.man_id) === carAsProduct.man_id
        );

        setModelName(
          ""
            .concat(man.length !== 0 ? man[0].man_name : "")
            .concat(" ")
            .concat(model.length !== 0 ? model[0].model_name : "No Data Available")
        );
        setModelNameLoading(false);
      };
      innerFunc();
    } catch (err) {
      console.log(err);
    }

    return () => abortController.abort();
  }, [carAsProduct.man_id, carAsProduct.model_id, mans]);

  const [imgError, setImgError] = useState(false);

  return (
    <>
      <div className={carProductsStyling["car-wrapper"]}>
        <div
          className={carProductsStyling["car-visual-picture"]}
          style={
            imgError ? { backgroundColor: "#d8dbe2", borderRadius: "10px" } : {}
          }
        >
          <img
            src={
              !imgError
                ? `https://static.my.ge/myauto/photos/${carAsProduct.photo}/thumbs/${carAsProduct.car_id}_1.jpg?v=${carAsProduct.photo_ver}`
                : NoCarImageSVG
            }
            width={182}
            height={144}
            onError={() => setImgError(true)}
            draggable={false}
            alt="Car picture"
          ></img>
        </div>

        <div className={carProductsStyling["car-info"]}>
          <div className={carProductsStyling["model-year-customs-location"]}>
            <div className={carProductsStyling["model-year"]}>
              {carAsProduct.for_rent && (
                <div className={carProductsStyling["for-rent-sticker"]}>
                  ქირავდება
                </div>
              )}
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {modelNameLoading ? "Loading..." : modelName}
              </p>
              <p style={{ color: "#8C929B", fontWeight: "bold" }}>
                {carAsProduct.prod_year} წ
              </p>
            </div>

            <div className={carProductsStyling["customs-location"]}>
              {carAsProduct.customs_passed ? (
                <div style={{ display: "flex", gap: "3px" }}>
                  <img
                    src={GreenCheckSVG}
                    className="Customs passed icon check"
                  ></img>
                  <p style={{ color: "#26B753" }}>განბაჟებული</p>
                </div>
              ) : (
                <p style={{ color: "#FF3B30" }}>განბაჟება 2,176 ₾</p>
              )}
              <div className={carProductsStyling["country-place"]}>
                <img src={GeorgiaSVG} alt="Georgia country icon"></img>
                <p>{severalIDMappings.locations[carAsProduct.location_id]}</p>
              </div>
            </div>
          </div>
          <div className={carProductsStyling["hardware-price"]}>
            <div className={carProductsStyling["engine-gearbox"]}>
              <div>
                <img src={EngineSVG} alt="Engine icon"></img>
                <p>
                  {eachEngineVolume} {" "}
                  {severalIDMappings.fuelTypeIds[carAsProduct.fuel_type_id]}
                </p>
              </div>

              <div>
                <img src={GearBoxSVG} alt="Gearbox icon"></img>
                <p>
                  {severalIDMappings.gearTypeIds[carAsProduct.gear_type_id]}
                </p>
              </div>
            </div>

            <div className={carProductsStyling["odometer-sWheel"]}>
              <div>
                <img src={OdometerSVG} alt="Odometer icon"></img>
                <p>{carAsProduct.car_run_km} კმ</p>
              </div>

              <div>
                <img src={SteeringWheel} alt="Steering Wheel icon"></img>
                <p>{carAsProduct.right_wheel ? "მარჯვენა" : "მარცხენა"}</p>
              </div>
            </div>

            <div className={carProductsStyling["price"]}>
              {carAsProduct.price !== 0 ? (
                <div>
                  <p className={carProductsStyling["price-set"]}>
                    {currency
                      ? new Intl.NumberFormat().format(
                          Number(carAsProduct.price_usd.toFixed(1))
                        )
                      : new Intl.NumberFormat().format(
                          Number(carAsProduct.price_value.toFixed(1))
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
                <p className={carProductsStyling["price-not-set"]}>
                  ფასი შეთანხმებით
                </p>
              )}
              <div></div>
            </div>
          </div>

          <div className={carProductsStyling["views-date-icons"]}>
            <div className={carProductsStyling["view-counter"]}>
              {carAsProduct.tech_inspection && (
                <div className={carProductsStyling["tech-inspection-vip"]}>
                  S-VIP
                </div>
              )}
              <p>{carAsProduct.views} ნახვა</p>•
              <p>{formatDateDifference(new Date(carAsProduct.order_date))}</p>
            </div>

            <div className={carProductsStyling["icons"]}>
              <img
                className={carProductsStyling["note-icon"]}
                src={NoteSVG}
                alt="Note icon"
              ></img>
              <img src={CompareSVG} alt="Compare cars icon"></img>
              <img
                className={carProductsStyling["favorite-icon"]}
                src={FavoriteSVG}
                alt="Favorite icon"
              ></img>
            </div>
          </div>
        </div>
      </div>

      <MobileCar
        car={carAsProduct}
        imgError={imgError}
        setImgError={setImgError}
        engineVolume={eachEngineVolume}
        currency={currency}
        modelNameLoading={modelNameLoading}
        modelName={modelName}
        cats={cats}
      />
    </>
  );
}

export default EachCarAsProduct;
