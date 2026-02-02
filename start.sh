echo "Starting backend server..."
cd backend-dashboard || exit
npm run dev &

echo "Starting frontend server..."
cd ../dashboard-enterprise || exit
npm start
