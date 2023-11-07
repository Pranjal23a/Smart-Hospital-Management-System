const express = require("express");
const router = express.Router();
const passport = require('passport');

const adminConroller = require('../controllers/admin_controller');
const staffController = require('../controllers/staff_controller');
const doctorController = require('../controllers/doctor_controller');
const inventoryController = require('../controllers/inventory_controller');

router.get('/add-inventory', passport.checkAuthentication, adminConroller.profile);
router.get('/sign-in', adminConroller.signIn);
router.get('/sign-up', adminConroller.signUp);
router.post('/create', adminConroller.create);

router.get('/destroy/:id', passport.checkAuthentication, inventoryController.destroyinventory);

router.get('/search/:name', adminConroller.search);
router.get('/search', passport.checkAuthentication, adminConroller.Showsearch);

router.get('/selldata', passport.checkAuthentication, adminConroller.sellData);
router.get('/selldata/:startDate/:endDate', adminConroller.getSellDataByDateRange);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/admin/sign-in' },
), adminConroller.createSession);

// admin signup staff
router.get('/staff-sign-up', passport.checkAuthentication, staffController.signUp);
router.post('/staff/create', staffController.create);

// admin signup doctor
router.get('/doctor-sign-up', passport.checkAuthentication, doctorController.signUp);
router.post('/doctor/create', doctorController.create);


router.get('/sign-out', adminConroller.destroySession);
module.exports = router;