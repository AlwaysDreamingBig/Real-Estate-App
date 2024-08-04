import React, { useState } from 'react';
import { parseISO, differenceInDays, format, addDays, endOfMonth, isValid } from 'date-fns';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const Preview = ({ entryDate, endingDate, monthlyPrice, daylyPrice, advisor, listing, electricity, water }) => {
  const protectionFee = 200;

  // Validate entryDate and endingDate
  const startDate = parseISO(entryDate);
  const endDate = parseISO(endingDate);
  const isEntryDateValid = isValid(startDate);
  const isEndingDateValid = isValid(endDate);
  const isDateRangeValid = isEntryDateValid && isEndingDateValid && startDate <= endDate;

  // Ensure either monthlyPrice or daylyPrice is provided
  const isPriceValid = monthlyPrice || daylyPrice;

  // State for selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // If any validation fails, display an error message
  if (!isEntryDateValid || !isEndingDateValid || !isDateRangeValid || !isPriceValid) {
    return (
      <div className='min-w-[500px]'>
        <h1 className='text-2xl font-serif font-semibold mb-8'>Payment details</h1>
        <hr className="w-full my-2 border-gray-300 mb-4" />
        <div className='text-red-500'>
          {(!isEntryDateValid || !isEndingDateValid) && <p>Invalid entry or ending date.</p>}
          {!isDateRangeValid && <p>Ending date must be after entry date.</p>}
          {!isPriceValid && <p>Either monthly price or daily price must be provided.</p>}
        </div>
      </div>
    );
  }

  // Calculate the total days between entryDate and endingDate
  const daysSpent = differenceInDays(endDate, startDate) + 1; // Total days spent

  // Generate rent segments
  const rentSegments = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const segmentEnd = endOfMonth(currentDate) < endDate ? endOfMonth(currentDate) : endDate;
    rentSegments.push({
      start: currentDate,
      end: segmentEnd,
    });
    currentDate = addDays(segmentEnd, 1);
  }

  // Calculate total price and segment prices
  const segmentPrices = rentSegments.map(segment => {
    const daysInSegment = differenceInDays(segment.end, segment.start) + 1;
    let price;
    if (monthlyPrice) {
      const daysInMonth = differenceInDays(endOfMonth(segment.start), startDate) + 1;
      price = (monthlyPrice / daysInMonth) * daysInSegment;
    } else {
      price = daylyPrice * daysInSegment;
    }
    return { ...segment, price };
  });

  const totalPrice = segmentPrices.reduce((acc, segment) => acc + segment.price, protectionFee);

  return (
    <div className='min-w-[500px]'>
      <h1 className='text-2xl font-serif font-semibold mb-8'>Payment details</h1>

      <hr className="w-full my-2 border-gray-300 mb-4" />

      <div className='mb-8'>
        <h2 className='mb-2 text-lg font-semibold'>You ➔ LandLordPay</h2>

        <p className='text-gray-500 italic text-xs mb-6'>Pay on LandLordPay to book this place</p>

        <div>
          {monthlyPrice && (
            <>
              <div className='justify-between flex'>
                <p className='mb-2'>First month's rent:</p>
                <p>{monthlyPrice}</p>
              </div>
              <div className='justify-between flex mb-4'>
                <p className='mb-2'>Number of months:</p>
                <p>{Math.ceil(daysSpent / 30)}</p>
              </div>
            </>
          )}

          {daylyPrice && (
            <>
              <div className='justify-between flex'>
                <p className='mb-2'>First day's rent:</p>
                <p>{daylyPrice}</p>
              </div>
              <div className='justify-between flex mb-4'>
                <p className='mb-2'>Number of days:</p>
                <p>{daysSpent}</p>
              </div>
            </>
          )}

          <div className='justify-between flex mb-4'>
            <p className='mb-2'>Tenant Protection fee:
              <Tooltip title="The tenant protection fee covers insurance and other protections for your stay.">
                <InfoIcon fontSize="small" className="ml-1" />
              </Tooltip>
            </p>
            <p className='mb-2'>{protectionFee}</p>
          </div>

          <div className='justify-between flex bg-slate-200 text-black p-2 font-bold'>
            <p className='mb-2'>Total Price:
              <Tooltip title="The total price includes rent and protection fees.">
                <InfoIcon fontSize="small" className="ml-1" />
              </Tooltip>
            </p>
            <p className='mb-2'>{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <hr className="w-full my-2 border-gray-300 mb-4" />

      <div className='mb-8'>
        <p>Pay with</p>
        <div className='flex space-x-4 justify-between'>
          <FaCreditCard
            size={30}
            className={`cursor-pointer ${selectedPaymentMethod === 'creditCard' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => setSelectedPaymentMethod('creditCard')}
          />
          <FaPaypal
            size={30}
            className={`cursor-pointer ${selectedPaymentMethod === 'paypal' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => setSelectedPaymentMethod('paypal')}
          />
          <FaApplePay
            size={30}
            className={`cursor-pointer ${selectedPaymentMethod === 'applePay' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => setSelectedPaymentMethod('applePay')}
          />
          <FaGooglePay
            size={30}
            className={`cursor-pointer ${selectedPaymentMethod === 'googlePay' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => setSelectedPaymentMethod('googlePay')}
          />
        </div>
        {selectedPaymentMethod && (
          <div className='mt-4'>
            <p className='text-lg'>Selected Payment Method: {selectedPaymentMethod}</p>
            {/* Add the logic for handling payment with the selected method */}
          </div>
        )}
      </div>

      <hr className="w-full my-2 border-gray-300 mb-4" />

      <div>
        <h2 className='mb-2 text-lg font-semibold'>You ➔ {advisor}</h2>

        <p className='text-gray-500 italic text-xs mb-6'>For better protection, make sure to proceed your payment through LandLordPay to book this place</p>

        <div className='flex flex-col'>
          <div className='justify-between flex'>
            <p className='mb-2'>Security deposit before move-in:</p>
            <p>{monthlyPrice}</p>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <p className='mb-2'>Utilities:</p>

              <div className='flex flex-col ml-6'>
                <div className='justify-between flex'>
                  <p className='mb-2'>Electricity:</p>
                  <p>{electricity ? 'included' : 'Not included'}</p>
                </div>

                <div className='justify-between flex'>
                  <p className='mb-2'>Gas:</p>
                  <p>{listing.gasHeating ? 'included' : 'Not included'}</p>
                </div>

                <div className='justify-between flex'>
                  <p className='mb-2'>Internet:</p>
                  <p>{listing.wifi ? 'included' : 'Not included'}</p>
                </div>

                <div className='justify-between flex'>
                  <p className='mb-2'>Water:</p>
                  <p>{water ? 'included' : 'Not included'}</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              <p className='mb-2'>Summary:</p>

              <div className='flex flex-col'>
                {segmentPrices.map((segment, index) => (
                  <div key={index} className='justify-between flex mb-6'>
                    <p className='ml-6'>{`${format(segment.start, 'dd/MM/yyyy')} - ${format(segment.end, 'dd/MM/yyyy')}`}</p>
                    <p className='ml-6'>{`$${segment.price.toFixed(2)}`}</p>
                  </div>
                ))}

                <div className='justify-between flex'>
                  <p className='ml-6 font-bold'>{`Total:`}</p>
                  <p className='ml-6'>{`${totalPrice.toFixed(2)}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
