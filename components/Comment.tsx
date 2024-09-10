import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import Avatar from "./Avatar";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import { CommentType } from "@/util/types";
import { getTimeDifferenceDescription } from "@/util/functions";
import TextField from "./TextField";

type Props = {
  comment: CommentType;
  isLiked: boolean;
  isDisliked: boolean;
  likePress: () => void;
  disslikePress: () => void;
  replyPress: () => void;
  deleteComment: () => void;
  myComment: boolean;
};
const Comment = (props: Props) => {
  const {
    comment,
    isLiked,
    isDisliked,
    myComment,
    likePress,
    disslikePress,
    replyPress,
    deleteComment,
  } = props;
  const [open, setopen] = useState(false);
  const [reply, setreply] = useState(false);
  const { width } = Dimensions.get("window");
  const [subOpen, setsubOpen] = useState(false);
  return (
    <View
      style={{
        backgroundColor: Colors.forgroundColor,
        borderRadius: 10,
        padding: 8,
        marginHorizontal: 8,
        marginBottom: 16,
        elevation: 10,
        shadowColor: "black",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 16,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Avatar
              mrgin={0}
              width={width * 0.35}
              uri={comment.link}
              iconSize={12}
              clear={() => {}}
            />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 18 }}>
            <TouchableOpacity>
              <Text style={{ color: Colors.mainColor }}>{comment.name}</Text>
            </TouchableOpacity>
            <Text style={{ color: Colors.mainColor, fontSize: 11 }}>
              {getTimeDifferenceDescription(comment.time.toDate())}
            </Text>
          </View>
        </View>

        {myComment && (
          <View style={{ paddingHorizontal: 18 }}>
            <TouchableOpacity onPress={deleteComment}>
              <FontAwesome6
                name="trash-can"
                size={24}
                color={Colors.mainColor}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        <Pressable onPress={() => setopen(!open)}>
          <Text
            style={{ color: Colors.mainColor, fontSize: 14 }}
            numberOfLines={open ? undefined : 5}
          >
            {comment.comment}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 22,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={likePress}>
              <AntDesign
                name={isLiked ? "like1" : "like2"}
                size={22}
                color={Colors.mainColor}
              />
            </TouchableOpacity>
            <Text style={{ color: Colors.mainColor, fontSize: 12 }}>
              {comment.likes}
            </Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 16 }}>
            <TouchableOpacity onPress={disslikePress}>
              <AntDesign
                name={isDisliked ? "dislike1" : "dislike2"}
                size={22}
                color={Colors.mainColor}
              />
            </TouchableOpacity>
            <Text style={{ color: Colors.mainColor, fontSize: 12 }}>
              {comment.dislikes}
            </Text>
          </View>
        </View>
        {comment.topLevel && (
          <View style={{ flexDirection: "row" }}>
            {comment.numberOfReplies > 0 && (
              <TouchableOpacity
                style={{ paddingHorizontal: 14 }}
                onPress={() => setsubOpen(!subOpen)}
              >
                <Text style={{ color: Colors.mainColor, fontSize: 12 }}>
                  {subOpen ? "hide" : "show"} {comment.numberOfReplies} replies
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setreply(!reply)}>
              <FontAwesome6
                name={reply ? "xmark" : "reply"}
                size={20}
                color={Colors.mainColor}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {reply && (
        <View style={{ paddingHorizontal: 8 }}>
          <TextField
            padding={8}
            lines
            holder="Post a Comment"
            holderColor={Colors.secondaryColor}
            elevation={10}
            type="default"
            password={false}
            onEndEditing={(text) => {}}
          />
          <TouchableOpacity
            onPress={replyPress}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 22,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="send" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
      )}
      {comment.subComments.length > 0 && subOpen && (
        <View>
          <FlatList
            data={comment.subComments}
            renderItem={({ item }) => (
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: Colors.bacgroundColor,
                    marginVertical: 12,
                  }}
                ></View>
                <Comment {...props} comment={item} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Comment;
