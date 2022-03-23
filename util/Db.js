import {enablePromise, openDatabase , SQLiteDatabase } from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
    return openDatabase({name: 'Stores.db', location: 'default'});
  };

  const tableName = 'Stores';
  enablePromise(true);
 

  export const createTable = async (db) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          id INT NOT NULL,
          address TEXT NOT NULL,
          banner TEXT NOT NULL,
          city TEXT NOT NULL,
          lastVisit TEXT NOT NULL,
          latitude TEXT NOT NULL,
          longitude TEXT NOT NULL
         
      );`;
  
    await db.executeSql(query);
  };

  export const saveStoresItems = async (db, cities) => {
    const insertQuery =
      `INSERT OR REPLACE INTO ${tableName}(id, address, banner, city, lastVisit, latitude, longitude) values` +
      cities.map(i => `(${i.id}, '${i.address}', '${i.banner}', '${i.city}', '${i.lastVisit}' , '${i.latitude}', '${i.longitude}')`).join(',');
  
    return db.executeSql(insertQuery);
  };

  export const getStoreItems = async (db) => {
    try {
      const storeItems = [];
      const results = await db.executeSql(`SELECT * FROM ${tableName}`);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          storeItems.push(result.rows.item(index))
        }
      });
      return storeItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get storeItems !!!');
    }
  };

  export const deleteTable = async (db) => {
    const query = `drop table ${tableName}`;
  
    await db.executeSql(query);
  };