import carProductsStyling from "../carProducts.module.css";
import { Product } from "../productsInterfaces";
import GreenCheckSVG from "../icons/greenCheck.svg";
import { useEffect, useState } from "react";
import { Manufacturer, Model } from "../../search/searchInterfaces";
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

function EachCarAsProduct({ carAsProduct }: { carAsProduct: Product }) {
  const [modelName, setModelName] = useState<string>('');
  const { currency } = useAppSelector((state) => state.searchReducer);
  const [modelNameLoading, setModelNameLoading] = useState<boolean>(true);
  const severalIDMappings: {
    gearTypeIds: {
      [key: number]: string;
    };

    fuelTypeIds: {
      [key: number]: string;
    };

    locations: {
      [key: string]: string;
    };
  } = {
    gearTypeIds: {
      1: "მექანიკა",
      2: "ავტომატიკა",
      3: "ტიპტრონიკი",
      4: "ვარიატორი",
    },

    fuelTypeIds: {
      2: "ბენზინი",
      3: "დიზელი",
      6: "ჰიბრიდი",
      7: "ელექტრო",
      8: "ბუნებრივი აირი",
      9: "თხევადი გაზი",
      10: "დატ. ჰიბრიდი",
      12: "წყალბადი",
    },

    locations: {
      1:"ქუთაისი",
      2: "თბილისი",
      3: "რუსთავი",
      4: "ბათუმი",
      5: "გორი",
      6: "ქარელი",
      7: "ზუგდიდი",
      8: "პოტი",
      9: "სამტრედია",
      10: "თელავი",
      11: "ახალციხე",
      12: "სიღნაღი",
      13: "ბორჯომი",
      14: "ხაშური",
      15: "აბაშა",
      16: "მარნეული",
      17: "ლაგოდეხი",
      18: "გურჯაანი",
      19: "სიღნაღი",
      20: "ზესტაფონი",
      21: "საგარეჯო",
      22: "გარდაბანი",
      23: "კასპი",
      24: "ბაღდათი",
      25: "ახალქალაქი",
      26: "თერჯოლა",
      27: "ბოლნისი",
      28: "გურჯაანი",
      29: "ხონი",
      30: "წალენჯიხა",
      31: "თეთრიწყარო",
      32: "ბაღდათი",
      33: "საგარეჯო",
      34: "სტეფანწმინდა",
      35: "დმანისი",
      36: "ხურჯა",
      37: "დედოფლისწყარო",
      38: "ზესტაფონი",
      39: "ნინოწმინდა",
      40: "ახალგორი",
      41: "ჩხოროწყარო",
      42: "სახალე",
      43: "კასპი",
      44: "თელავი",
      45: "სამტრედია",
      46: "მცხეთა",
      47: "ბათუმი",
      48: "ახალციხე",
      49: "ცაგერი",
      50: "ხაშური",
      51: "ადიგენი",
      52: "ქარელი",
      53: "დმანისი",
      54: "სვანეთი",
      55: "ლაგოდეხი",
      56: "საჩხერე",
      57: "წალენჯიხა",
      58: "გურჯაანი",
      59: "თერჯოლა",
      60: "სასტუმრო",
      61: "მარნეული",
      62: "თაგგები",
      63: "წალენჯიხა",
      64: "ნინოწმინდა",
      65: "კასპი",
      66: "ბაღდათი",
      67: "ზესტაფონი",
      68: "დმანისი",
      69: "გუდაუთა",
      70: "თბილისი",
      71: "ქუთაისი",
      72: "რუსთავი",
      73: "ბათუმი",
      74: "გორი",
      75: "ქარელი",
      76: "ზუგდიდი",
      77: "პოტი",
      78: "სამტრედია",
      79: "თელავი",
      80: "ახალციხე",
      81: "სიღნაღი",
      82: "ბორჯომი",
      83: "ხაშური",
      84: "აბაშა",
      85: "მარნეული",
      86: "ლაგოდეხი",
      87: "გურჯაანი",
      88: "სიღნაღი",
      89: "ზესტაფონი",
      90: "საგარეჯო",
      91: "გარდაბანი",
      92: "კასპი",
      93: "ბაღდათი",
      94: "ახალქალაქი",
      95: "თერჯოლა",
      96: "ბოლნისი",
      97: "გურჯაანი",
      98: "ხონი",
      99: "წალენჯიხა",
      100: "თეთრიწყარო",
    },
  };


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

    const fetchMans = async () => {
      const request = await fetch(`https://static.my.ge/myauto/js/mans.json`);
      const mans = request.json();

      return mans;
    };

    try {
      const innerFunc = async () => {
        const fetchedModels: {
          data: Model[];
        } = await fetchModels();

        const mans: Manufacturer[] = await fetchMans();

        const model = fetchedModels.data.filter(
          (eachModel: Model) => eachModel.model_id === carAsProduct.model_id
        );

        const man = mans.filter(
          (eachMan: Manufacturer) =>
            Number(eachMan.man_id) === carAsProduct.man_id
        );

        setModelName(
        ''.concat(man.length !== 0 ? man[0].man_name : '').concat(" ").concat(model.length !== 0 ? model[0].model_name : '')
          
        );
        setModelNameLoading(false);
      };
      innerFunc();
    } catch (err) {
      console.log(err);
    }

    return () => abortController.abort();
  }, [carAsProduct.man_id, carAsProduct.model_id]);

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
                {eachEngineVolume}{" "}
                {severalIDMappings.fuelTypeIds[carAsProduct.fuel_type_id]}
              </p>
            </div>

            <div>
              <img src={GearBoxSVG} alt="Gearbox icon"></img>
              <p>{severalIDMappings.gearTypeIds[carAsProduct.gear_type_id]}</p>
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

    <MobileCar/>
    </>
  );
}

export default EachCarAsProduct;
