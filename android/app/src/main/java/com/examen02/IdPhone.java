package com.reactmodule;
import android.annotation.SuppressLint;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class IdPhone extends ReactContextBaseJavaModule {
    static ReactContext reactContext;

    IdPhone(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }
    @NonNull
    @Override
    public String getName() {
        return "IdPhone";
    }

    @ReactMethod
    public void getPhoneID(Promise response) {
        try {
            @SuppressLint("HardwareIds") String id = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
            response.resolve(id);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }
}
