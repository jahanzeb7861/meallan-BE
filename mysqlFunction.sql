
INSERT INTO profiles (label) VALUES ('CLIENT'),('ADMIN'),('SUPER_ADMIN'),('CASHIER');


INSERT INTO currencies(label,code) VALUES ('Euro','EUR'),
										  ('United States Dollar','USD'),
										  ('Canadian Dollar','CAD'),
										  ('Australian Dollar','USD'),
										  ('Egyptian Pound','EGP'),
										  ('Pound Sterling','GBP'),
										  ('Moroccan Dirham','MAD'),
										  ('Tunisian Dinar','TND'),
										  ('Turkish Lira','TRY'),
										  ('Algerian Dinar','DZD'),
										  ('Bahraini Dinar','BHD'),
										  ('Jordanian Dinar','JOD'),
										  ('Kuwaiti Dinar','KWD'),
										  ('UAE dirham','AED'),
										  ('Saudi Arabian Riyal','SAR'),
										  ('Qatari Riyal','QAR'),
										  ('Japanese Yen','JPY');



DELIMITER //
CREATE FUNCTION getDistanceFromLatLonInKm ( lat1 double, lon1 double,lat2 double, lon2 double)
RETURNS double
READS SQL DATA
DETERMINISTIC
BEGIN

   DECLARE R int;
   DECLARE dLat,dLon,a,c,d double;

   SET R = 6371;
   SET dLat=(lat2-lat1)* (PI()/180);
   SET dLon=(lon2-lon1)* (PI()/180);
   SET a =  SIN(dLat/2) * SIN(dLat/2) + COS(lat1 * (PI()/180)) * COS(lat2 * (PI()/180)) * SIN(dLon/2) * SIN(dLon/2);
   SET c = 2 * ATAN2(SQRT(a), SQRT(1-a)); 
   SET d = R * c; 
   RETURN d;
END; //

DELIMITER ;