const Guild = require('../models/guild.model');

const joinGuild = async (req, res) => {
  const { characterId } = req.body;
  const { guildId } = req.body;
  const character = await Character.findByIdAndUpdate(
    characterId,
    { guild: guildId },
    { new: true }
  );
  const guild = await Guild.findByIdAndUpdate(
    guildId,
    { $push: { characters: characterId } },
    { new: true }
  );
  res.status(200).json({ guild, character });
};

const leaveGuild = async (req, res) => {
  const { characterId } = req.body;
  const { guildId } = req.body;
  try {
    const removedCharacter = await Character.findByIdAndUpdate(
      characterId,
      { guild: null },
      { new: true }
    );
    const removedGuild = await Guild.findByIdAndUpdate(guildId, {
      $pull: { characters: characterId },
    });
    //prettier-ignore
    res
      .status(200)
      .json({ action: 'Removed Character from guild', removedCharacter, removedGuild });
  } catch (error) {
    //prettier-ignore
    res
      .status(400)
      .json({ error: error })
  }
};

module.exports = { joinGuild, leaveGuild };
