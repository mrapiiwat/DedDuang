import { View, StyleSheet, Image } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { tabbarIcon } from "../../utils/tabbarIcon";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder();

  const icon = {
    index: (
      <Image
        source={{
          uri: tabbarIcon[0],
        }}
        className="w-[35] h-[35]"
        resizeMode="contain"
      />
    ),
    home: (
      <Image
        source={{
          uri: tabbarIcon[1],
        }}
        className="w-[35] h-[35]"
        resizeMode="contain"
      />
    ),
    seer: (
      <Image
        source={{
          uri: tabbarIcon[2],
        }}
        className="w-[35] h-[35]"
        resizeMode="contain"
      />
    ),
  };

  return (
    <View className="items-center">
      <View style={styles.tabbar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // console.log(route.name);
          // if (["[name].tsx"].includes(route.name)) {
          //   return null;
          // }

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabbarItem}
            >
              <View
                className={
                  isFocused
                    ? "bg-[#6395EC] h-[55] w-[55] rounded-full items-center justify-center"
                    : ""
                }
              >
                {
                  // @ts-ignore
                  icon[route.name]
                }
              </View>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B003F",
    height: 74,
    width: 370,
    borderRadius: 74 / 2,
    borderCurve: "continuous",
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
