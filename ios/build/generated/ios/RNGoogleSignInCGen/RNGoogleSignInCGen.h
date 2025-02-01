/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleObjCpp
 *
 * We create an umbrella header (and corresponding implementation) here since
 * Cxx compilation in BUCK has a limitation: source-code producing genrule()s
 * must have a single output. More files => more genrule()s => slower builds.
 */

#ifndef __cplusplus
#error This file must be compiled as Obj-C++. If you are importing it, you must change your file extension to .mm.
#endif

// Avoid multiple includes of RNGoogleSignInCGen symbols
#ifndef RNGoogleSignInCGen_H
#define RNGoogleSignInCGen_H

#import <Foundation/Foundation.h>
#import <RCTRequired/RCTRequired.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import <RCTTypeSafety/RCTTypedModuleConstants.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTCxxConvert.h>
#import <React/RCTManagedPointer.h>
#import <ReactCommon/RCTTurboModule.h>
#import <optional>
#import <vector>


NS_ASSUME_NONNULL_BEGIN
namespace JS {
  namespace NativeGoogleSignin {
    struct Constants {

      struct Builder {
        struct Input {
          RCTRequired<NSString *> SIGN_IN_CANCELLED;
          RCTRequired<NSString *> IN_PROGRESS;
          RCTRequired<NSString *> PLAY_SERVICES_NOT_AVAILABLE;
          RCTRequired<NSString *> SIGN_IN_REQUIRED;
          RCTRequired<NSString *> SCOPES_ALREADY_GRANTED;
          RCTRequired<double> BUTTON_SIZE_ICON;
          RCTRequired<double> BUTTON_SIZE_WIDE;
          RCTRequired<double> BUTTON_SIZE_STANDARD;
          RCTRequired<NSString *> ONE_TAP_START_FAILED;
          RCTRequired<NSString *> NO_SAVED_CREDENTIAL_FOUND;
        };

        /** Initialize with a set of values */
        Builder(const Input i);
        /** Initialize with an existing Constants */
        Builder(Constants i);
        /** Builds the object. Generally used only by the infrastructure. */
        NSDictionary *buildUnsafeRawValue() const { return _factory(); };
      private:
        NSDictionary *(^_factory)(void);
      };

      static Constants fromUnsafeRawValue(NSDictionary *const v) { return {v}; }
      NSDictionary *unsafeRawValue() const { return _v; }
    private:
      Constants(NSDictionary *const v) : _v(v) {}
      NSDictionary *_v;
    };
  }
}
@protocol NativeGoogleSigninSpec <RCTBridgeModule, RCTTurboModule>

- (void)signIn:(NSDictionary *)params
       resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject;
- (void)configure:(NSDictionary *)params
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;
- (void)addScopes:(NSDictionary *)params
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;
- (void)playServicesAvailable:(BOOL)showPlayServicesUpdateDialog
                      resolve:(RCTPromiseResolveBlock)resolve
                       reject:(RCTPromiseRejectBlock)reject;
- (void)signInSilently:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject;
- (void)signOut:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject;
- (void)revokeAccess:(RCTPromiseResolveBlock)resolve
              reject:(RCTPromiseRejectBlock)reject;
- (void)clearCachedAccessToken:(NSString *)tokenString
                       resolve:(RCTPromiseResolveBlock)resolve
                        reject:(RCTPromiseRejectBlock)reject;
- (NSNumber *)hasPreviousSignIn;
- (NSDictionary * _Nullable)getCurrentUser;
- (void)getTokens:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject;
- (facebook::react::ModuleConstants<JS::NativeGoogleSignin::Constants::Builder>)constantsToExport;
- (facebook::react::ModuleConstants<JS::NativeGoogleSignin::Constants::Builder>)getConstants;

@end

@interface NativeGoogleSigninSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeGoogleSignin'
   */
  class JSI_EXPORT NativeGoogleSigninSpecJSI : public ObjCTurboModule {
  public:
    NativeGoogleSigninSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react
inline JS::NativeGoogleSignin::Constants::Builder::Builder(const Input i) : _factory(^{
  NSMutableDictionary *d = [NSMutableDictionary new];
  auto SIGN_IN_CANCELLED = i.SIGN_IN_CANCELLED.get();
  d[@"SIGN_IN_CANCELLED"] = SIGN_IN_CANCELLED;
  auto IN_PROGRESS = i.IN_PROGRESS.get();
  d[@"IN_PROGRESS"] = IN_PROGRESS;
  auto PLAY_SERVICES_NOT_AVAILABLE = i.PLAY_SERVICES_NOT_AVAILABLE.get();
  d[@"PLAY_SERVICES_NOT_AVAILABLE"] = PLAY_SERVICES_NOT_AVAILABLE;
  auto SIGN_IN_REQUIRED = i.SIGN_IN_REQUIRED.get();
  d[@"SIGN_IN_REQUIRED"] = SIGN_IN_REQUIRED;
  auto SCOPES_ALREADY_GRANTED = i.SCOPES_ALREADY_GRANTED.get();
  d[@"SCOPES_ALREADY_GRANTED"] = SCOPES_ALREADY_GRANTED;
  auto BUTTON_SIZE_ICON = i.BUTTON_SIZE_ICON.get();
  d[@"BUTTON_SIZE_ICON"] = @(BUTTON_SIZE_ICON);
  auto BUTTON_SIZE_WIDE = i.BUTTON_SIZE_WIDE.get();
  d[@"BUTTON_SIZE_WIDE"] = @(BUTTON_SIZE_WIDE);
  auto BUTTON_SIZE_STANDARD = i.BUTTON_SIZE_STANDARD.get();
  d[@"BUTTON_SIZE_STANDARD"] = @(BUTTON_SIZE_STANDARD);
  auto ONE_TAP_START_FAILED = i.ONE_TAP_START_FAILED.get();
  d[@"ONE_TAP_START_FAILED"] = ONE_TAP_START_FAILED;
  auto NO_SAVED_CREDENTIAL_FOUND = i.NO_SAVED_CREDENTIAL_FOUND.get();
  d[@"NO_SAVED_CREDENTIAL_FOUND"] = NO_SAVED_CREDENTIAL_FOUND;
  return d;
}) {}
inline JS::NativeGoogleSignin::Constants::Builder::Builder(Constants i) : _factory(^{
  return i.unsafeRawValue();
}) {}
NS_ASSUME_NONNULL_END
#endif // RNGoogleSignInCGen_H
