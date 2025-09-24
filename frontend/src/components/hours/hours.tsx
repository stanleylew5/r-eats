"use client";

const Hours = () => {
  return (
    <div className="mx-4 py-8 md:mx-12">
      <p className="text-reats-blue-200 mb-4 text-center text-2xl font-semibold md:mb-2 md:text-left">
        Dining Hours (Fall, Winter, & Spring Quarters)
      </p>
      <p className="text-reats-blue-200/80 text-center text-sm md:text-left">
        These are the standard dining hours that do not account for special
        events or holidays.
      </p>

      <p className="text-reats-blue-200 mt-8 mb-2 text-center text-xl font-medium md:text-left">
        Glasgow
      </p>

      <div className="border-reats-blue-100 mb-6 overflow-hidden rounded-xl border">
        <div className="flex flex-col md:flex-row md:flex-wrap">
          <div className="bg-reats-blue-50 text-reats-blue-200 md:border-reats-blue-100 w-full py-2 text-center font-semibold md:order-1 md:w-1/2 md:rounded-tl-xl md:border-r">
            Mon–Fri
          </div>

          <div className="md:border-reats-blue-100 w-full space-y-2 p-3 text-sm md:order-3 md:w-1/2 md:border-r">
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Breakfast</span>
              <span className="text-gray-600">7:30 AM – 10:30 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Lunch</span>
              <span className="text-gray-600">10:30 AM – 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Dinner</span>
              <span className="text-gray-600">5:00 PM – 9:00 PM</span>
            </div>
          </div>

          <div className="bg-reats-blue-50 text-reats-blue-200 w-full py-2 text-center font-semibold md:order-2 md:w-1/2 md:rounded-tr-xl">
            Sat–Sun
          </div>

          <div className="w-full space-y-2 p-3 text-sm md:order-4 md:w-1/2 md:rounded-br-xl">
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Brunch</span>
              <span className="text-gray-600">10:00 AM – 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Lunch</span>
              <span className="text-gray-600">Closed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Dinner</span>
              <span className="text-gray-600">5:00 PM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-reats-blue-200 mt-2 mb-2 text-center text-xl font-medium md:text-left">
        Lothian
      </p>

      <div className="border-reats-blue-100 mb-6 overflow-hidden rounded-xl border">
        <div className="flex flex-col md:flex-row md:flex-wrap">
          <div className="bg-reats-blue-50 text-reats-blue-200 md:border-reats-blue-100 w-full py-2 text-center font-semibold md:order-1 md:w-1/2 md:rounded-tl-xl md:border-r">
            Mon–Fri
          </div>

          <div className="md:border-reats-blue-100 w-full space-y-2 p-3 text-sm md:order-3 md:w-1/2 md:border-r">
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Lunch</span>
              <span className="text-gray-600">11:00 AM – 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">Dinner</span>
              <span className="text-gray-600">5:00 PM – 10:00 PM</span>
            </div>
          </div>

          <div className="bg-reats-blue-50 text-reats-blue-200 w-full py-2 text-center font-semibold md:order-2 md:w-1/2 md:rounded-tr-xl">
            Sat–Sun
          </div>

          <div className="w-full space-y-2 p-3 text-sm md:order-4 md:w-1/2 md:rounded-br-xl">
            <div className="flex justify-between">
              <span className="text-reats-blue-200 font-medium">All Meals</span>
              <span className="text-gray-600">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hours;
