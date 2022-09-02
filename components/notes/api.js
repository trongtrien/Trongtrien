
export const updateNoteWhenCreated = async ({
        title,
        message,
        startAt
    }) => {
      return {
        title: title,
        message: message,
        startAt:startAt
      }
    }
export const updateNoteWhenDeleted= async () => {
        return {};
      }