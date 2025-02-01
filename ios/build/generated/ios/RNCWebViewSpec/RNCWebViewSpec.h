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

// Avoid multiple includes of RNCWebViewSpec symbols
#ifndef RNCWebViewSpec_H
#define RNCWebViewSpec_H

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

@protocol NativeRNCWebViewModuleSpec <RCTBridgeModule, RCTTurboModule>

- (void)isFileUploadSupported:(RCTPromiseResolveBlock)resolve
                       reject:(RCTPromiseRejectBlock)reject;
- (void)shouldStartLoadWithLockIdentifier:(BOOL)shouldStart
                           lockIdentifier:(double)lockIdentifier;

@end

@interface NativeRNCWebViewModuleSpecBase : NSObject {
@protected
facebook::react::EventEmitterCallback _eventEmitterCallback;
}
- (void)setEventEmitterCallback:(EventEmitterCallbackWrapper *)eventEmitterCallbackWrapper;


@end

namespace facebook::react {
  /**
   * ObjC++ class for module 'NativeRNCWebViewModule'
   */
  class JSI_EXPORT NativeRNCWebViewModuleSpecJSI : public ObjCTurboModule {
  public:
    NativeRNCWebViewModuleSpecJSI(const ObjCTurboModule::InitParams &params);
  };
} // namespace facebook::react

NS_ASSUME_NONNULL_END
#endif // RNCWebViewSpec_H
