import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { useDispatch, useSelector } from "react-redux";
import { HotelContext } from "../Context/hotelContext";
import getStripe from "../../getStripe";
import { UserContext } from "../Context/userContext";
import { isBookingSameDay } from "../../features/account/accountSlice";

function DisplayResult() {
  const { point, setPoint } = useContext(UserContext);

  const router = useRouter();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const { currentHotel, setCurrentHotel } = useContext(HotelContext);
  const property = router.query;
  const { dateAvailable, displayAvailableDays, dateBookingObj, countDayStay } =
    useSelector((state) => state.booking);
  const user = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(isBookingSameDay(dateBookingObj));
  }, [dateBookingObj, dispatch]);

  const priceConvert = (priceTemp) => {
    let temp = priceTemp.split("$");
    return parseFloat(temp[1]);
  };
  const price = priceConvert(property.price);

  if (!property.id) return <h2>Loading......</h2>;
  let total = 0
  if (!point) {
    total = (price * countDayStay);
  } else {
    total = (price * countDayStay) * 0.95;
  }

  const handleCheckout = async () => {
    const date = [
      `${dateBookingObj.inMonth}/${dateBookingObj.inDay}/${dateBookingObj.inYear}`,
      `${dateBookingObj.outMonth}/${dateBookingObj.outDay}/${dateBookingObj.outYear}`,
    ];
    let res = { ...user, ...property, total, date };

    const stripe = await getStripe();
    if (!res.login.status) return alert("Need to sign in");
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    });

    if (response.statusCode === 500) return;
    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="flex flex-col">
      <div className="">
        <div className="py-2 inline-block min-w-full">
          <div className="">
            {user.sameDayBooking ? (
              <span className="text-red-900 font-bold">
                Note : You have made a reservation during the time from {user.dayHist[0]} - {user.dayHist[1]}. Please
                go to Profile &gt; Reservations for make change.
              </span>
            ) : (
              <>
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
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Property Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
                      <tr className="w-full text-center">
                        <td>Please select day range</td>
                      </tr>
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
                                  {property.title}
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
                                  ${`${price}`}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                  ${`${total}`}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <button
                                    className="bg-green-900/20 p-2 rounded-[12px] text-md font-bold tracking-wider text-green-600 border border-rose-900"
                                    onClick={handleCheckout}
                                  >
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
                          <tr className="border-b last:mb-20" key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {property.title}
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
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayResult;
