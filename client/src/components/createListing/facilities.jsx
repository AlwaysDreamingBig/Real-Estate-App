import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCouch} from '@fortawesome/free-solid-svg-icons';
import { faToilet, faTree, faRestroom, faUtensils, faBacon, faFire, faBlender, 
  faWifi, faTv, faLock, faSoap, faTshirt, faLaptop, faSnowflake, 
  faSink, faWheelchair, faWind } from '@fortawesome/free-solid-svg-icons';


  

export default function Facilities({formData, handleChange}) {
  return (
    <div>
        {/** Facilities */}
<div className='mt-6 items-center flex flex-col bg-slate-50 border rounded-lg flex-1 p-4 ml-4'>
  <div className='bg-slate-50 border border-slate-400 rounded-lg flex-1 flex-col p-4'>
    <h2 className='font-semibold text-lg'>
      Facilities
    </h2>
    <form className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4'>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='unisexBathroom'
          onChange={handleChange}
          checked={formData.unisexBathroom}
          className='mr-2'
        />
        <label htmlFor='unisexBathroom' className='flex items-center'>
          <FontAwesomeIcon icon={faToilet} className='mr-2 text-gray-500' />
          Unisex Bathroom
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='sharedLivingRoom'
          onChange={handleChange}
          checked={formData.sharedLivingRoom}
          className='mr-2'
        />
        <label htmlFor='sharedLivingRoom' className='flex items-center'>
          <FontAwesomeIcon icon={faCouch} className='mr-2 text-gray-500' />
          Shared Living Room
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='sharedGarden'
          onChange={handleChange}
          checked={formData.sharedGarden}
          className='mr-2'
        />
        <label htmlFor='sharedGarden' className='flex items-center'>
          <FontAwesomeIcon icon={faTree} className='mr-2 text-gray-500' />
          Shared Garden
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='sharedToilet'
          onChange={handleChange}
          checked={formData.sharedToilet}
          className='mr-2'
        />
        <label htmlFor='sharedToilet' className='flex items-center'>
          <FontAwesomeIcon icon={faRestroom} className='mr-2 text-gray-500' />
          Shared Toilet
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='sharedKitchen'
          onChange={handleChange}
          checked={formData.sharedKitchen}
          className='mr-2'
        />
        <label htmlFor='sharedKitchen' className='flex items-center'>
          <FontAwesomeIcon icon={faUtensils} className='mr-2 text-gray-500' />
          Shared Kitchen
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='sharedBalcony'
          onChange={handleChange}
          checked={formData.sharedBalcony}
          className='mr-2'
        />
        <label htmlFor='sharedBalcony' className='flex items-center'>
          <FontAwesomeIcon icon={faBacon} className='mr-2 text-gray-500' />
          Shared Balcony
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='gasHeating'
          onChange={handleChange}
          checked={formData.gasHeating}
          className='mr-2'
        />
        <label htmlFor='gasHeating' className='flex items-center'>
          <FontAwesomeIcon icon={faFire} className='mr-2 text-gray-500' />
          Gas Heating
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='sharedKitchenware'
          onChange={handleChange}
          checked={formData.sharedKitchenware}
          className='mr-2'
        />
        <label htmlFor='sharedKitchenware' className='flex items-center'>
          <FontAwesomeIcon icon={faBlender} className='mr-2 text-gray-500' />
          Shared Kitchenware
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='wifi'
          onChange={handleChange}
          checked={formData.wifi}
          className='mr-2'
        />
        <label htmlFor='wifi' className='flex items-center'>
          <FontAwesomeIcon icon={faWifi} className='mr-2 text-gray-500' />
          WiFi
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='livingRoomFurniture'
          onChange={handleChange}
          checked={formData.livingRoomFurniture}
          className='mr-2'
        />
        <label htmlFor='livingRoomFurniture' className='flex items-center'>
          <FontAwesomeIcon icon={faCouch} className='mr-2 text-gray-500' />
          Living Room Furniture
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='bed'
          onChange={handleChange}
          checked={formData.bed}
          className='mr-2'
        />
        <label htmlFor='bed' className='flex items-center'>
          <FontAwesomeIcon icon={faBed} className='mr-2 text-gray-500' />
          Bed
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='tv'
          onChange={handleChange}
          checked={formData.tv}
          className='mr-2'
        />
        <label htmlFor='tv' className='flex items-center'>
          <FontAwesomeIcon icon={faTv} className='mr-2 text-gray-500' />
          TV
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='bedroomLock'
          onChange={handleChange}
          checked={formData.bedroomLock}
          className='mr-2'
        />
        <label htmlFor='bedroomLock' className='flex items-center'>
          <FontAwesomeIcon icon={faLock} className='mr-2 text-gray-500' />
          Bedroom Lock
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='washingMachine'
          onChange={handleChange}
          checked={formData.washingMachine}
          className='mr-2'
        />
        <label htmlFor='washingMachine' className='flex items-center'>
          <FontAwesomeIcon icon={faSoap} className='mr-2 text-gray-500' />
          Washing Machine
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='dryer'
          onChange={handleChange}
          checked={formData.dryer}
          className='mr-2'
        />
        <label htmlFor='dryer' className='flex items-center'>
          <FontAwesomeIcon icon={faWind} className='mr-2 text-gray-500' />
          Dryer
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='closet'
          onChange={handleChange}
          checked={formData.closet}
          className='mr-2'
        />
        <label htmlFor='closet' className='flex items-center'>
          <FontAwesomeIcon icon={faTshirt} className='mr-2 text-gray-500' />
          Closet
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='desk'
          onChange={handleChange}
          checked={formData.desk}
          className='mr-2'
        />
        <label htmlFor='desk' className='flex items-center'>
          <FontAwesomeIcon icon={faLaptop} className='mr-2 text-gray-500' />
          Desk
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='airConditioning'
          onChange={handleChange}
          checked={formData.airConditioning}
          className='mr-2'
        />
        <label htmlFor='airConditioning' className='flex items-center'>
          <FontAwesomeIcon icon={faSnowflake} className='mr-2 text-gray-500' />
          Air Conditioning
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='dishwasher'
          onChange={handleChange}
          checked={formData.dishwasher}
          className='mr-2'
        />
        <label htmlFor='dishwasher' className='flex items-center'>
          <FontAwesomeIcon icon={faSink} className='mr-2 text-gray-500' />
          Dishwasher
        </label>
      </div>
      <div className='flex items-center'>
        <input
          type="checkbox"
          id='accessFriendly'
          onChange={handleChange}
          checked={formData.accessFriendly}
          className='mr-2'
        />
        <label htmlFor='accessFriendly' className='flex items-center'>
          <FontAwesomeIcon icon={faWheelchair} className='mr-2 text-gray-500' />
          Access Friendly
        </label>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}
