import { useRouter } from "next/router";
import React from "react";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import { useSelector } from "react-redux";

function DisplayResult() {
  const router = useRouter();
  const property = router.query;
  const { dateAvailable, displayAvailableDays, dateBookingObj, countDayStay } =
    useSelector((state) => state.booking);
  const priceConvert = (priceTemp) => {
    let temp = priceTemp.split("$");
    return parseFloat(temp[1]);
  };
  const price = priceConvert(property.price);
  console.log(dateBookingObj);
  if (!property.id) return <h2>Loading......</h2>;
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
                              <button className="bg-green-900/50 p-2 rounded-[12px] text-md font-bold tracking-wider text-red-600 border border-black">
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
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                            {`${price * countDayStay}$`}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button className="bg-green-900/50 p-2 rounded-[12px] text-md font-bold tracking-wider text-red-600 border border-black">
                              Reserve
                            </button>
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
