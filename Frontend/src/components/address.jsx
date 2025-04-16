import { useState } from 'react';

const CheckoutDialog = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    deliveryAddress: {
      street: 'IIIT dharwad',
      city: 'karnataka ',
      postalCode: '580009',
      country: 'India'
    },
    phoneNumber: '7895424566',
    paymentMethod: 'Credit Card'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('deliveryAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg dark:bg-gray-800">
        {/* Dialog Header */}
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Complete Your Order
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Dialog Body */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="street" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="street"
                  name="deliveryAddress.street"
                  value={formData.deliveryAddress.street}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="deliveryAddress.city"
                  value={formData.deliveryAddress.city}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="deliveryAddress.postalCode"
                  value={formData.deliveryAddress.postalCode}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="country" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="deliveryAddress.country"
                  value={formData.deliveryAddress.country}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                required
              />
            </div>
            
            {/* Payment Method Section */}
            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Payment Method</h3>
              <div className="space-y-4">
                {['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'].map((method) => (
                  <div key={method} className="flex items-center">
                    <input
                      id={`payment-${method}`}
                      name="paymentMethod"
                      type="radio"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      required
                    />
                    <label
                      htmlFor={`payment-${method}`}
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {method}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-end space-x-3 border-t p-4 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDialog;