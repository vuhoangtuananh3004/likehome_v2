import { useRouter } from "next/router";
import React, { useContext } from "react";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { useSelector } from "react-redux";
import { HotelContext } from "../Context/hotelContext";
import getStripe from "../../getStripe";

function DisplayResult() {
  const router = useRouter();
  const { currentHotel, setCurrentHotel } = useContext(HotelContext);
  const property = router.query;
  const { dateAvailable, displayAvailableDays, dateBookingObj, countDayStay } =
    useSelector((state) => state.booking);

  const priceConvert = (priceTemp) => {
    let temp = priceTemp.split("$");
    return parseFloat(temp[1]);
  };
  const price = priceConvert(property.price);
  if (!property.id) return <h2>Loading......</h2>;

  const user = useSelector((state) => state.account);
  let res = { ...user, ...property };
  console.log(res);

  const handleCheckout = async () => {
    const stripe = await getStripe();
    if (!res.user) return alert(" need to sign in");
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    });

    if (response.statusCode === 500) return;
    const data = await response.json();
    console.log(data);
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Property Name
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Property Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Adults
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Date Availability
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Price for 1 nights
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Booking
                  </th>
                </tr>
              </thead>
              <tbody>
                {!displayAvailableDays ? (
                  <div className="w-full text-center">
                    Please select day range
                  </div>
                ) : (
                  <>
                    <>
                      {dateBookingObj.inDay && dateBookingObj.outDay ? (
                        <>
                          <tr className="border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              0
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {property.listingName}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {property.roomType}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {property.listingGuestLabel}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {`${dateBookingObj.inMonth}/${dateBookingObj.inDay}/${dateBookingObj.inYear} - ${dateBookingObj.outMonth}/${dateBookingObj.outDay}/${dateBookingObj.outYear}`}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                              {`${price}$`}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                              {`${price * countDayStay}$`}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <button className="bg-green-900/20 p-2 rounded-[12px] text-md font-bold tracking-wider text-green-600 border border-rose-900" onClick={handleCheckout}>
                                Reserve
                              </button>
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                    </>

                    {displayAvailableDays.map((e, index) => (
                      <>
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {property.listingName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {property.roomType}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {property.listingGuestLabel}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {`${e.startMonth}/${e.startDay}/${e.startYear} - ${e.endMonth}/${e.endDay}/${e.endYear}`}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                            {`${price}$`}
                          </td>
                         
                        </tr>
                      </>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayResult;
